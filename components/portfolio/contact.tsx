"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Send, Loader2 } from "lucide-react"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/kassiobcunha/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/KassioB?tab=repositories", label: "GitHub" },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" })
  const [csrfToken, setCsrfToken] = useState<string>("")

  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        const res = await fetch("/api/contact/csrf", { method: "GET", credentials: "same-origin" })
        const data = await res.json()
        setCsrfToken(data.token || "")
      } catch (e) {
        // Silently fail; server side will also check referer/origin
      }
    }
    fetchCsrf()
  }, [])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\+?[0-9\s\-()]{8,}$/

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Informe seu nome."
        return ""
      case "email":
        if (!value.trim()) return "Informe seu e-mail."
        if (!emailRegex.test(value)) return "E-mail inválido."
        return ""
      case "phone":
        if (!value.trim()) return ""
        if (!phoneRegex.test(value)) return "Telefone inválido."
        return ""
      case "subject":
        if (!value.trim()) return "Informe o assunto."
        return ""
      case "message":
        if (!value.trim()) return "Informe a mensagem."
        if (value.trim().length < 10) return "Mensagem muito curta (mínimo 10 caracteres)."
        return ""
      default:
        return ""
    }
  }

  const validateAll = () => {
    const nextErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      const err = validateField(key, value as string)
      if (err) nextErrors[key] = err
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
    const err = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: null, message: "" })
    if (!validateAll()) {
      setStatus({ type: 'error', message: "Verifique os campos destacados." })
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ ...formData, csrfToken })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Falha ao enviar mensagem.")
      }
      if (data?.test && (data?.previewUrlAdmin || data?.previewUrlUser)) {
        setStatus({ type: 'success', message: `Mensagem enviada em ambiente de testes. Pré-visualização: ${data.previewUrlAdmin || data.previewUrlUser}` })
      } else {
        setStatus({ type: 'success', message: "Mensagem enviada com sucesso! Você receberá uma confirmação por e-mail." })
      }
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setErrors({})
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || "Ocorreu um erro ao enviar." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div>
              <p className="text-primary text-sm font-medium mb-2 uppercase tracking-wider">
                Tem um projeto para conversarmos?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                FALE COMIGO
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase">Contato</h3>
                <a 
                  href="mailto:kassiobcunha@gmail.com" 
                  className="text-accent hover:underline flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  kassiobcunha@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase">Redes sociais</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                        aria-label={social.label}
                        target={social.href === "#" ? undefined : "_blank"}
                        rel={social.href === "#" ? undefined : "noopener noreferrer"}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
              Formulário de contato
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-describedby="form-status">
              <input type="hidden" name="csrfToken" value={csrfToken} />
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  className="bg-card border-border focus:border-accent"
                  aria-invalid={!!errors.name || undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className="bg-card border-border focus:border-accent"
                  aria-invalid={!!errors.email || undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                  Telefone (opcional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="bg-card border-border focus:border-accent"
                  aria-invalid={!!errors.phone || undefined}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && <p id="phone-error" role="alert" className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  className="bg-card border-border focus:border-accent"
                  aria-invalid={!!errors.subject || undefined}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && <p id="subject-error" role="alert" className="mt-1 text-xs text-destructive">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange("message")}
                  className="bg-card border-border focus:border-accent min-h-[120px]"
                  aria-invalid={!!errors.message || undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto px-8"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
              </Button>
              <div id="form-status" aria-live="polite" className="min-h-6">
                {status.type === 'success' && (
                  <p className="text-sm text-primary"> {status.message} </p>
                )}
                {status.type === 'error' && (
                  <p className="text-sm text-destructive"> {status.message} </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
