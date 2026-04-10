import { NextResponse } from 'next/server'

type RateEntry = { count: number; resetAt: number }
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQ = 5
const ORIGIN_FALLBACK = 'http://localhost:3001'

function getIP(headers: Headers) {
  const xf = headers.get('x-forwarded-for') || ''
  const ip = xf.split(',')[0].trim()
  return ip || headers.get('x-real-ip') || 'unknown'
}

function checkRateLimit(ip: string) {
  const store = (globalThis as any).__rateLimitStore || ((globalThis as any).__rateLimitStore = new Map<string, RateEntry>())
  const now = Date.now()
  const entry = store.get(ip)
  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true }
  }
  if (entry.count >= MAX_REQ) {
    return { ok: false, retryAfter: Math.max(0, Math.ceil((entry.resetAt - now) / 1000)) }
  }
  entry.count += 1
  store.set(ip, entry)
  return { ok: true }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function isValidPhone(phone: string) {
  if (!phone) return true
  return /^\+?[0-9\s\-()]{8,}$/.test(phone)
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || ORIGIN_FALLBACK
    const referer = req.headers.get('referer') || ''
    if (!referer.startsWith(origin)) {
      return NextResponse.json({ error: 'CSRF verificação falhou (referer).' }, { status: 403 })
    }

    const ip = getIP(req.headers as Headers)
    const rl = checkRateLimit(String(ip))
    if (!rl.ok) {
      return NextResponse.json({ error: 'Muitas requisições. Tente mais tarde.' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } })
    }

    const body = await req.json()
    const { name, email, phone, subject, message, csrfToken } = body || {}
    if (!csrfToken) {
      return NextResponse.json({ error: 'Token CSRF ausente.' }, { status: 400 })
    }

    const cookieHeader = req.headers.get('cookie') || ''
    const cookieMatch = cookieHeader.match(/csrfToken=([^;]+)/)
    const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch[1]) : ''
    if (!cookieToken || cookieToken !== csrfToken) {
      return NextResponse.json({ error: 'Token CSRF inválido.' }, { status: 403 })
    }

    const errors: Record<string, string> = {}
    if (!name || !String(name).trim()) errors.name = 'Informe seu nome.'
    if (!email || !isValidEmail(String(email))) errors.email = 'E-mail inválido.'
    if (!isValidPhone(String(phone || ''))) errors.phone = 'Telefone inválido.'
    if (!subject || !String(subject).trim()) errors.subject = 'Informe o assunto.'
    if (!message || String(message).trim().length < 10) errors.message = 'Mensagem muito curta (mínimo 10 caracteres).'
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validação falhou.', errors }, { status: 422 })
    }

    const nodemailer = await import('nodemailer')
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const fromEnv = process.env.SMTP_FROM
    let transporter: any
    let fromAddress: string
    let isTest = false
    if (host && user && pass) {
      const isGmail = /gmail\.com$/i.test(String(host))
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        requireTLS: isGmail && port === 587 ? true : undefined,
        auth: { user, pass },
      })
      try {
        await transporter.verify()
      } catch (e: any) {
        const msg = String(e?.message || '')
        if (isGmail && (msg.includes('535') || msg.toLowerCase().includes('invalid login'))) {
          const hint = pass && pass.length < 16 ? ' Use uma senha de app de 16 caracteres.' : ''
          return NextResponse.json({ error: 'Falha na autenticação SMTP com Gmail.' + hint }, { status: 401 })
        }
        return NextResponse.json({ error: 'Falha na autenticação SMTP.' }, { status: 401 })
      }
      fromAddress = (fromEnv && String(fromEnv).trim()) || (user as string)
    } else {
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      })
      fromAddress = testAccount.user
      isTest = true
    }

    const toAddress = 'kassiobcunha@gmail.com'

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${String(name)}</p>
        <p><strong>E-mail:</strong> ${String(email)}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${String(phone)}</p>` : ''}
        <p><strong>Assunto:</strong> ${String(subject)}</p>
        <p><strong>Mensagem:</strong></p>
        <pre style="white-space: pre-wrap; background:#f6f6f6; padding:12px; border-radius:8px">${String(message)}</pre>
      </div>
    `

    const infoAdmin = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: String(email),
      subject: `[Contato] ${String(subject)}`,
      html,
    })

    const infoUser = await transporter.sendMail({
      from: fromAddress,
      to: String(email),
      subject: 'Recebemos sua mensagem',
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
          <p>Olá, ${String(name)}!</p>
          <p>Recebemos sua mensagem e retornaremos em breve.</p>
          <p><strong>Assunto:</strong> ${String(subject)}</p>
          <p><strong>Mensagem enviada:</strong></p>
          <pre style="white-space: pre-wrap; background:#f6f6f6; padding:12px; border-radius:8px">${String(message)}</pre>
          <p>Atenciosamente,<br/>Kássio BC</p>
        </div>
      `,
    })

    const previewUrlAdmin = isTest ? nodemailer.getTestMessageUrl(infoAdmin) : null
    const previewUrlUser = isTest ? nodemailer.getTestMessageUrl(infoUser) : null
    return NextResponse.json({ ok: true, previewUrlAdmin, previewUrlUser, test: isTest })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Erro interno.' }, { status: 500 })
  }
}
