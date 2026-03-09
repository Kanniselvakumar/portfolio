"use client";
import { useState } from "react";
import { personalInfo } from "../data/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // Replace with your email service (e.g. EmailJS, Resend, Formspree)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#040e1c] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">
            05. Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            I'm open to internships, entry-level roles, and collaboration. Feel free to reach out!
          </p>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-5">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: personalInfo.email,
                href: `mailto:${personalInfo.email}`,
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Phone",
                value: personalInfo.phone,
                href: `tel:${personalInfo.phone}`,
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Location",
                value: personalInfo.location,
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/15 transition-all duration-300"
              >
                <div className="text-cyan-400 mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-slate-300 hover:text-cyan-300 transition-colors duration-200 break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-300">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300 font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300 font-mono"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about an opportunity..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300 font-mono resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || status === "sent"}
                  className="w-full py-3.5 rounded-lg font-mono font-bold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: status === "sent"
                      ? "linear-gradient(135deg, #059669, #10b981)"
                      : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: status === "sent"
                      ? "0 0 20px rgba(16,185,129,0.3)"
                      : "0 0 20px rgba(6,182,212,0.2)",
                  }}
                >
                  <span className="text-black">
                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                        ? "✓ Message Sent!"
                        : "Send Message →"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}