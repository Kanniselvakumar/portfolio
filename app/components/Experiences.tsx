"use client";
import { experiences } from "../data/data";

export default function Experience() {
  return (
    <section id="experience" className="space-y-6">
      {/* Header — identical to Projects */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-mono text-[#F8FAFC]/70">Experience</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Internships &amp; virtual experience.
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Hands-on simulations and virtual programs with industry leaders.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {experiences.map((exp, index) => (
          <article
            key={exp.id}
            className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,12,24,0.9)] p-5 md:p-6 transition-all duration-300 hover:border-white/25 hover:shadow-[0_24px_80px_rgba(0,0,0,0.75)] hover:-translate-y-1 hover:rotate-[0.15deg]"
          >
            {/* Glow background — exact same as projects */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.35), transparent 55%)",
              }}
            />

            {/* Top row: icon + exp number + period badge */}
            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-xl">
                  <span aria-hidden="true">{exp.icon}</span>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
                  Exp {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-full border shrink-0"
                style={{
                  color: exp.logoColor,
                  borderColor: exp.borderColor,
                  background: exp.accentColor,
                }}
              >
                {exp.period}
              </span>
            </div>

            {/* Company + role */}
            <div className="relative mb-3">
              <h3 className="text-sm font-semibold text-white leading-snug">
                {exp.company}
              </h3>
              <p className="mt-0.5 text-xs font-mono text-slate-400">
                {exp.role}
              </p>
            </div>

            {/* Description */}
            <p className="relative text-sm leading-relaxed text-slate-200 mb-4">
              {exp.description}
            </p>

            {/* Task tags — exact same style as project tags */}
            <div className="relative flex flex-wrap gap-2 text-[11px] mb-5">
              {exp.tasks.map((task) => (
                <span
                  key={task}
                  className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-slate-100"
                >
                  {task}
                </span>
              ))}
            </div>

            {/* Footer: completed badge + certificate link */}
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-mono text-cyan-500/60">
                  Completed
                </span>
              </div>

              {exp.certificate ? (
                <a
                  href={exp.certificate.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-semibold btn-secondary hover:border-cyan-400/50 hover:text-cyan-100 transition-all duration-200"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  {exp.certificate.label}
                </a>
              ) : (
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] font-mono border border-white/10 text-slate-600 cursor-not-allowed">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Coming soon
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}