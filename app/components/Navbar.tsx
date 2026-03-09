"use client";
import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "../data/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setActive(href.replace("#", ""));
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#050d1a]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="text-xl font-bold font-mono tracking-widest group"
        >
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">&lt;</span>
          <span className="text-white group-hover:text-cyan-100 transition-colors">KK</span>
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">/&gt;</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`relative px-4 py-2 text-sm font-medium font-mono transition-all duration-300 rounded-md group ${active === link.href.replace("#", "")
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-cyan-300"
                  }`}
              >
                {active === link.href.replace("#", "") && (
                  <span className="absolute inset-0 bg-cyan-500/10 rounded-md border border-cyan-500/20" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={personalInfo.resumeUrl}
          download
          className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-mono font-semibold text-cyan-400 border border-cyan-500/40 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
        >
          Resume <span className="text-xs">↓</span>
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-[#050d1a]/95 backdrop-blur-xl border-b border-cyan-500/10`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-mono text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={personalInfo.resumeUrl}
              download
              className="block px-4 py-3 text-sm font-mono font-semibold text-cyan-400 border border-cyan-500/30 rounded-lg text-center hover:bg-cyan-500/10 transition-all"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}