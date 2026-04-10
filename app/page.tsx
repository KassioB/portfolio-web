import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { Services } from "@/components/portfolio/services"
import { Skills } from "@/components/portfolio/skills"
import { Portfolio } from "@/components/portfolio/portfolio"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
