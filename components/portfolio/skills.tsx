const skills = [
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Node.js", color: "#339933" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          HABILIDADES
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Habilidades, ferramentas e tecnologias que eu utilizo:
        </p>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group relative"
            >
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-all hover:scale-110 cursor-pointer"
              >
                <span 
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: skill.color, fontFamily: 'var(--font-heading)' }}
                >
                  {skill.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded border border-border">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
