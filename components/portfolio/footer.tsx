export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} - Todos os direitos reservados, web design e desenvolvimento - Kássio BC
        </p>
      </div>
    </footer>
  )
}
