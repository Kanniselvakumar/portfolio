"use client";
import { personalInfo, education } from "../data/data";

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-[#040e1c] overflow-hidden">
      {/* BG accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">
            01. About
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Who I Am
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div>
            <div className="relative p-8 rounded-2xl border border-cyan-500/10 bg-white/[0.02] backdrop-blur-sm">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/50 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/50 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/50 rounded-br-xl" />

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                When I'm not writing code, I explore new technologies, work on NLP experiments,
                and contribute to open-source projects. I'm passionate about sustainable tech
                and data-driven problem solving.
              </p>

              {/* Info grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Location", value: personalInfo.location },
                  { label: "Email", value: personalInfo.email, truncate: true },
                  { label: "Phone", value: personalInfo.phone },
                  { label: "Status", value: "Open to Work" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p
                      className={`text-sm text-slate-300 ${item.truncate ? "truncate" : ""
                        }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education timeline */}
          <div>
            <h3 className="text-lg font-mono font-semibold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-cyan-500" />
              Education
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />

              <div className="space-y-8 pl-10">
                {education.map((edu, i) => (
                  <div key={i} className="relative group">
                    {/* Dot */}
                    <div
                      className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${edu.current
                        ? "border-cyan-400 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                        : "border-slate-600 bg-[#040e1c] group-hover:border-cyan-500/50"
                        }`}
                    />

                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm">{edu.degree}</h4>
                        {edu.current && (
                          <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-full px-2 py-0.5 shrink-0">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{edu.institution}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {edu.period && (
                          <span className="text-xs font-mono text-slate-500">{edu.period}</span>
                        )}
                        {edu.score && (
                          <span className="text-xs font-mono text-cyan-500/70">{edu.score}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}