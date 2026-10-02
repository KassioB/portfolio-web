"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Mente Aberta",
    description: "Projeto de landing page e branding para uma plataforma de conteúdos, com foco em visual moderno, UX clara e comunicação forte.",
    tags: ["Next.js", "Design System", "Landing Page"],
    color: "from-primary/20 to-accent/10",
    link: "https://menteaberta.vercel.app/"
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-16" style={{ fontFamily: 'var(--font-heading)' }}>
          PORTFÓLIO
        </h2>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video bg-transparent flex items-center justify-center relative overflow-hidden">
                <img
                  src="/menteaberta.png"
                  alt="Imagem do projeto Mente Aberta, mostrando a interface da plataforma"
                  className="relative z-10 h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement | null
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div
                  aria-label="Imagem do projeto Mente Aberta indisponível"
                  className="hidden relative z-10 h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground"
                >
                  ×
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors shrink-0"
                    aria-label={`Ver projeto ${project.title}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <a href="https://github.com/KassioB?tab=repositories" target="_blank" rel="noopener noreferrer">
              Ver todos os meus projetos
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
