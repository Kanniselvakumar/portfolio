"use client";
import { skills } from "../data/data";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-[#030b16] overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">
            02. Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Tech Stack
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/15 transition-all duration-300 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
                <h3 className="text-white font-semibold font-mono text-sm tracking-wide uppercase">
                  {group.category}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-5">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-xs font-mono text-cyan-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                          width: `${skill.level}%`,
                          background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
                          boxShadow: "0 0 10px rgba(6,182,212,0.4)",
                        }}
                      >
                        {/* Shimmer */}
                        <div
                          className="absolute inset-0 opacity-50"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                            animation: "shimmer 2s infinite",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {[
            "Java", "Python", "PHP", "Flask", "Next.js",
            "MySQL", "NLP", "NLTK", "Scikit-learn", "HTML5", "CSS3", "JavaScript",
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-xs font-mono text-cyan-400/80 border border-cyan-500/15 rounded-full bg-cyan-500/5 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}