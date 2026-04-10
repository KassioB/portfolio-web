import { Monitor, Palette, Code2 } from "lucide-react"

const services = [
  {
    icon: Monitor,
    title: "Desenvolvimento de Sites",
    description: "Crio sites a partir do seu design pronto. Seja uma landing page ou um site institucional, faço com que ele fique bonito e funcione bem em qualquer dispositivo.",
    align: "left"
  },
  {
    icon: Palette,
    title: "Web Design",
    description: "Posso desenhar seu site do zero. Crio interfaces modernas, simples e fáceis de usar, alinhadas à sua marca e aos seus objetivos.",
    align: "right"
  },
  {
    icon: Code2,
    title: "Desenvolvimento com React",
    description: "Desenvolvo aplicações web dinâmicas usando React e Next.js, tornando-as fáceis de escalar e manter. É uma ótima escolha para sites complexos e interativos.",
    align: "left"
  }
]

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-16" style={{ fontFamily: 'var(--font-heading)' }}>
          MEUS SERVIÇOS
        </h2>

        <div className="space-y-8 max-w-4xl">
          {services.map((service, index) => {
            const Icon = service.icon
            const isRight = service.align === "right"
            
            return (
              <div
                key={service.title}
                className={`flex ${isRight ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`bg-card border border-border rounded-lg p-6 max-w-lg hover:border-primary/50 transition-colors ${
                    isRight ? "ml-auto" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
