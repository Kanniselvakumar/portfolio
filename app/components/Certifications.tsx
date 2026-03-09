"use client";
import { certifications } from "../data/data";

export default function Certifications() {
    return (
        <section id="certifications" className="relative py-28 bg-[#030b16] overflow-hidden">
            <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">
                        04. Certifications
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                        Credentials
                    </h2>
                    <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div
                            key={cert.title}
                            className={`group relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${cert.color} hover:border-cyan-500/20 transition-all duration-300 overflow-hidden`}
                        >
                            {/* Hover shimmer */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.03) 0%, transparent 60%)" }}
                            />

                            {/* Icon */}
                            <div className="text-4xl mb-4">{cert.icon}</div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-base mb-2 leading-snug">
                                {cert.title}
                            </h3>
                            <p className="text-slate-500 text-sm font-mono">{cert.issuer}</p>

                            {/* Verified badge */}
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-xs font-mono text-cyan-500/60">Certified</span>
                            </div>

                            {/* Bottom line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/30 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}