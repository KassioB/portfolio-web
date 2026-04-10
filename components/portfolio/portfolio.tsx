"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Solução de e-commerce full-stack com Next.js, pagamentos via Stripe e gestão de estoque em tempo real.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    color: "from-primary/20 to-accent/10",
    link: "#"
  },
  {
    title: "Aplicativo de Tarefas",
    description: "Aplicação colaborativa de gestão de tarefas com atualizações em tempo real e recursos para equipes.",
    tags: ["React", "Node.js", "Socket.io"],
    color: "from-accent/20 to-primary/10",
    link: "#"
  },
  {
    title: "Site de Portfólio",
    description: "Site de portfólio moderno, com animações suaves e design totalmente responsivo.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    color: "from-primary/20 to-accent/10",
    link: "#"
  },
  {
    title: "Painel do Tempo",
    description: "Painel de clima em tempo real com previsões por localização e mapas interativos.",
    tags: ["React", "OpenWeather API", "Charts"],
    color: "from-accent/20 to-primary/10",
    link: "#"
  },
  {
    title: "Plataforma de Blog",
    description: "Sistema de gestão de conteúdo com suporte a Markdown e otimização para SEO.",
    tags: ["Next.js", "MDX", "Prisma"],
    color: "from-primary/20 to-accent/10",
    link: "#"
  },
  {
    title: "Controle Financeiro",
    description: "Aplicativo de controle financeiro pessoal com visão de orçamento e análise de gastos.",
    tags: ["React", "D3.js", "Firebase"],
    color: "from-accent/20 to-primary/10",
    link: "#"
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-16" style={{ fontFamily: 'var(--font-heading)' }}>
          PORTFÓLIO
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,200,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,200,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <span className="text-4xl font-bold text-foreground/20" style={{ fontFamily: 'var(--font-heading)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
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
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  )
}
