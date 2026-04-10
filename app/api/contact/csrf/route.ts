import { NextResponse } from 'next/server'

export async function GET() {
  const token = crypto.randomUUID()
  const res = NextResponse.json({ token })
  res.cookies.set('csrfToken', token, {
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 60 * 60,
  })
  return res
}
