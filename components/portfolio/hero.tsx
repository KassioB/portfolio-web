"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,200,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating Code Elements */}
      <div className="absolute top-1/4 right-[10%] text-muted-foreground/20 font-mono text-sm hidden lg:block select-none">
        <div>{'<html>'}</div>
        <div className="ml-4">{'<TypeScript />'}</div>
        <div className="ml-4">{'Front-End'}</div>
        <div className="ml-8">{'<state html>'}</div>
        <div className="ml-4">{'Grid'}</div>
        <div>{'</html>'}</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-primary">DESENVOLVEDOR</span>
              <br />
              <span className="text-primary">FRONTEND</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
              Eu sou o Kássio – um <span className="text-accent underline underline-offset-4">desenvolvedor web</span> apaixonado por criar sites bonitos e responsivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base"
              >
                <a href="#portfolio">VER MEUS PROJETOS</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-border hover:border-accent hover:text-accent px-8 py-6 text-base bg-transparent"
              >
                <a href="#contact">ENTRAR EM CONTATO</a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/30">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-8xl font-bold text-primary/40" style={{ fontFamily: 'var(--font-heading)' }}>KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
