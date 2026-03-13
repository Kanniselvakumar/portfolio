import Image from "next/image";
import {
  personalInfo,
  skills,
  projects,
  certifications,
  education,
  navLinks,
} from "./data/data";
import Experience from "./components/Experiences";
import AIAssistant from "./components/ai-assistant";
import ContactForm from "./components/contact-form";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute inset-0 opacity-[0.55] bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:rgba(7,10,18,0.72)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="text-gradient text-sm font-bold">
                KK
              </span>
            </span>
            <span className="text-sm font-semibold tracking-tight">
              {personalInfo.name}
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-slate-300 transition-colors hover:text-[var(--primary)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Top GitHub / LinkedIn */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10 md:flex"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10 md:flex"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M4.98 3.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM3 9h3.96V21H3V9zm7.47 0H14.3v1.64h.05c.46-.87 1.6-1.8 3.3-1.8 3.53 0 4.18 2.23 4.18 5.13V21H17.9v-5.27c0-1.26-.03-2.87-1.75-2.87-1.75 0-2.02 1.37-2.02 2.78V21h-3.66V9z" />
              </svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden h-9 items-center justify-center rounded-xl px-3 text-xs font-semibold md:inline-flex btn-secondary"
            >
              Contact
            </a>
            <a
              href={personalInfo.resumeUrl}
              className="inline-flex h-9 items-center justify-center rounded-xl px-3 text-xs font-semibold btn-primary shine"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* Main container */}
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-12 md:pt-20">
        {/* Hero */}
        <section
          id="hero"
          className="grid gap-10 md:min-h-[420px] md:grid-cols-12 md:items-center md:gap-14"
        >
          {/* Left: intro */}
          <div className="space-y-7 md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Open to opportunities
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{personalInfo.location}</span>
            </div>

            <div className="space-y-3 max-w-xl">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Software developer crafting{" "}
                <span className="text-gradient">practical</span>, polished projects.
              </h1>
              <p className="text-base font-medium text-slate-200/90">
                {personalInfo.name} • {personalInfo.title}
              </p>
              <p className="text-sm leading-relaxed text-slate-300">
                {personalInfo.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold btn-primary shine"
              >
                View projects
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold btn-secondary"
              >
                Let&apos;s talk
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold btn-secondary"
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: profile + snapshot */}
          <div className="md:col-span-5 md:justify-self-end">
            <div className="space-y-4 max-w-sm ml-auto">
              {/* Profile card */}
              <div className="group relative card card-hover rounded-2xl p-5 flex items-center gap-4 overflow-hidden">
                {/* Advanced Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,182,212,0.05)] to-[rgba(124,58,237,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-500" />
                
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-cyan-400/20 mix-blend-overlay animate-pulse" />
                  <Image
                    src="/profile.jpg"
                    alt={personalInfo.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 relative z-10">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-400/80 mb-1">
                    Portfolio
                  </p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-50 transition-colors">
                    {personalInfo.name}
                  </p>
                  <p className="text-xs text-slate-300 truncate group-hover:text-cyan-100/70 transition-colors">
                    {personalInfo.title} · {personalInfo.location}
                  </p>
                </div>
              </div>

              {/* Snapshot card */}
              <div className="group gradient-border rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <div className="relative overflow-hidden rounded-2xl p-5 bg-[rgba(7,14,28,0.95)] shadow-2xl shadow-black/40">
                  {/* Decorative Background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(34,211,238,0.15) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-80"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(34,211,238,0.2) 0%, transparent 60%), radial-gradient(circle at bottom left, rgba(124,58,237,0.15) 0%, transparent 60%)",
                    }}
                  />
                  {/* Subtle pulsing glow */}
                  <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500 pointer-events-none" />

                  <div className="relative flex items-center justify-between">
                    <p className="text-xs font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                      Snapshot
                    </p>
                  </div>
                  
                  <div className="relative mt-4 grid gap-3 z-10">
                    <div className="card rounded-xl p-4 border border-white/5 bg-black/40 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/5 group-hover:border-cyan-500/20">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-100/50 mb-1">Currently</p>
                      <p className="text-sm font-semibold text-white leading-snug">
                        {education.find((e) => e.current)?.degree} <span className="text-slate-400 font-normal">@</span>{" "}
                        {education.find((e) => e.current)?.institution}
                      </p>
                    </div>

                    <div className="card rounded-xl p-4 border border-white/5 bg-black/40 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/5 group-hover:border-cyan-500/20">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-100/50 mb-1">Core Focus</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {['Full-Stack', 'Scalable Systems', 'AI/ML'].map(tag => (
                           <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-cyan-50 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                             {tag}
                           </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About + Education */}
        <section
          id="about"
          className="grid gap-8 md:grid-cols-2 items-start scroll-mt-28"
        >
          <div>
            <p className="text-xs font-mono text-cyan-300/80">About</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              A developer who enjoys building useful products.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              I like working across the stack, keeping things simple, and
              shipping features that feel polished. I care about readable code,
              performance, and user experience.
            </p>
          </div>

          <div>
            <div className="card card-hover rounded-2xl p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  Education
                </h3>
                <p className="text-xs text-slate-400">Timeline</p>
              </div>

              <ol className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={`${e.degree}-${e.institution}`} className="relative">
                    <div className="flex gap-3">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(34,211,238,0.14)]" />
                      <div className="w-full">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                          <p className="text-sm font-semibold text-white">
                            {e.degree}
                          </p>
                          <p className="text-xs text-slate-400">
                            {e.period || (e.current ? "Current" : "")}
                          </p>
                        </div>
                        <p className="text-xs text-slate-300">
                          {e.institution} • {e.location}
                          {e.score ? ` • ${e.score}` : ""}
                          {e.current ? " • Currently enrolled" : ""}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-[#F8FAFC]/70">Skills</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Tools I use to build.
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              A blend of languages, frameworks, and core CS fundamentals.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((group) => (
              <div
                key={group.category}
                className="group/card relative card card-hover rounded-2xl p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] hover:border-cyan-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-white group-hover/card:text-cyan-50 transition-colors">
                    {group.category}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400/50 group-hover/card:text-cyan-400/80 transition-colors">
                    {group.items.length} items
                  </span>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <div
                      key={s.name}
                      className="group/badge relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-default"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(34,211,238,0.25) 0%, transparent 70%)",
                        }}
                      />
                      <span className="relative z-10">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-[#F8FAFC]/70">Projects</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Projects that show how I think.
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              End‑to‑end academic and personal projects with full flows, real data,
              and clear problem statements.
            </p>
          </div>

          <div className="space-y-5">
            {(featuredProjects.length ? featuredProjects : projects).map(
              (project, index) => (
                <article
                  key={project.id}
                  className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,12,24,0.9)] p-5 md:p-6 transition-all duration-300 hover:border-white/25 hover:shadow-[0_24px_80px_rgba(0,0,0,0.75)] hover:-translate-y-1 hover:rotate-[0.15deg]"
                >
                  {/* Glow background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.35), transparent 55%)",
                    }}
                  />

                  <div className="relative flex flex-col gap-4 md:flex-row md:items-start">
                    {/* Index + icon */}
                    <div className="flex items-start gap-3 md:w-1/3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-xl">
                        <span aria-hidden="true">{project.icon}</span>
                      </div>
                      <div className="leading-tight">
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
                          Project {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3">
                      <p className="text-sm leading-relaxed text-slate-200">
                        {project.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-slate-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center justify-center rounded-full px-3 text-[11px] font-semibold btn-secondary"
                          >
                            View code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center justify-center rounded-full px-3 text-[11px] font-semibold btn-primary shine"
                          >
                            Live demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* Experience */}
        <Experience />

        {/* Certifications */}
        <section id="certifications" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-[#F8FAFC]/70">
                Certifications
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Proof of learning.
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Courses and workshops completed recently.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((c) => {
              const content = (
                <div
                  key={c.title}
                  className="group relative overflow-hidden card card-hover rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-500/30 cursor-pointer h-full block"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
                  />
                  <div className="relative flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-white/20 transition-colors">
                      <span aria-hidden="true" className="group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-50 transition-colors">
                        {c.title}
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5 group-hover:text-slate-200 transition-colors">{c.issuer}</p>
                    </div>
                  </div>
                  {c.url && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </div>
                  )}
                </div>
              );

              return c.url ? (
                <a key={c.title} href={c.url} target="_blank" rel="noreferrer" className="block outline-none">
                  {content}
                </a>
              ) : (
                content
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-[#F8FAFC]/70">Contact</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Let&apos;s build something.
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Best way to reach me:{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[var(--accent)] hover:text-[var(--primary)]"
              >
                {personalInfo.email}
              </a>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="card card-hover rounded-2xl p-5">
                <p className="text-sm font-semibold text-white">
                  Quick info
                </p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-slate-400">Location</dt>
                    <dd className="text-slate-200">{personalInfo.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-slate-200 hover:text-cyan-200"
                      >
                        {personalInfo.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">Phone</dt>
                    <dd className="text-slate-200">{personalInfo.phone}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="md:col-span-7">
              <ContactForm email={personalInfo.email} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-white/20 hover:bg-white/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-white/20 hover:bg-white/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              LinkedIn
            </a>
          </div>
        </footer>
      </div>

      {/* Floating AI assistant */}
      <AIAssistant />
    </main>
  );
}

