"use client";
import { projects } from "../data/data";

type Project = (typeof projects)[number] & { image?: string };

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 bg-[#040e1c] overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-64 bg-cyan-500/3 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">
            03. Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            What I&apos;ve Built
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {(projects as Project[]).map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
              />

              {/* Cover Image */}
              {project.image ? (
                <div className="relative w-full h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay: fades image into card bg at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040e1c]/20 to-[#040e1c]" />
                  {/* Project icon badge */}
                  <div className="absolute bottom-3 left-4 text-3xl drop-shadow-lg select-none">
                    {project.icon}
                  </div>
                  {/* Index badge */}
                  <div className="absolute top-3 right-4 font-mono text-xs font-bold text-cyan-400/80 bg-[#040e1c]/60 backdrop-blur-sm px-2 py-1 rounded-md border border-cyan-500/20">
                    0{i + 1}
                  </div>
                </div>
              ) : (
                /* Fallback: icon + number when no image */
                <div className="absolute top-6 right-6 text-5xl font-black font-mono text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 select-none">
                  0{i + 1}
                </div>
              )}

              {/* Card body */}
              <div className="p-7">
                {/* Show icon in body only when there is no image */}
                {!project.image && (
                  <div className="text-4xl mb-5">{project.icon}</div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-cyan-400/70 border border-cyan-500/15 rounded-md bg-cyan-500/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-300 group/link"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                      </svg>
                      <span className="group-hover/link:underline underline-offset-2">Source</span>
                      <span className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* More on GitHub */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Kanniselvakumar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-mono text-sm text-cyan-400 border border-cyan-500/30 rounded-full hover:bg-cyan-500/5 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
          >
            View More on GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}