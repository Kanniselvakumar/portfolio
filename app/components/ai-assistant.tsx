"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi! I'm Kanniselvakumar's assistant. Ask about his skills, projects, or how to get in touch.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState(".");
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Animate typing dots
    useEffect(() => {
        if (!loading) return;
        const interval = setInterval(() => {
            setDots((d) => (d.length >= 3 ? "." : d + "."));
        }, 400);
        return () => clearInterval(interval);
    }, [loading]);

    // Auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Focus input when opened
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = { role: "user", content: text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            // ✅ Call your own API route — no CORS, no exposed key
            const response = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: messages, // send conversation history for context
                }),
            });

            const data = await response.json();
            const reply = data?.answer ?? "Sorry, I couldn't get a response. Try again!";

            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Oops! Something went wrong. Please try again shortly.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) sendMessage();
    };

    // Simple markdown bold renderer
    const renderText = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="text-[var(--accent)] font-semibold">
                    {part.slice(2, -2)}
                </strong>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    const quickQuestions = [
        "What are his skills?",
        "Tell me about his projects",
        "How to contact him?",
    ];

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {/* Tooltip */}
                {!open && (
                    <div className="animate-bounce-slow mr-1">
                        <div className="relative bg-[#0b1020] border border-white/10 text-[var(--accent)] text-xs font-mono px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                            Ask me anything!
                            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-[#0b1020] border-r border-b border-white/10 rotate-45" />
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setOpen((o) => !o)}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{
                        background: open
                            ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                            : "linear-gradient(135deg, #22d3ee, #7c3aed)",
                        boxShadow: open
                            ? "0 0 0 0 transparent"
                            : "0 0 25px rgba(124,58,237,0.35), 0 0 50px rgba(34,211,238,0.18)",
                    }}
                    aria-label="Toggle AI Assistant"
                >
                    {/* Pulse ring */}
                    {!open && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-[var(--accent)]/15" />
                    )}

                    {open ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.096.04A2.25 2.25 0 0117.25 13.5h.649M9.75 3.104A23.963 23.963 0 0112 3c.97 0 1.927.057 2.867.166M3 16.5v.75A2.25 2.25 0 005.25 19.5h1.5M3 16.5h2.25M21 16.5v.75A2.25 2.25 0 0118.75 19.5h-1.5M21 16.5h-2.25M12 19.5v1.5m0-1.5a2.25 2.25 0 002.25-2.25M12 19.5a2.25 2.25 0 01-2.25-2.25m4.5 0h-4.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] transition-all duration-500 ease-out ${open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
            >
                <div
                    className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    style={{ background: "#070a12" }}
                >
                    {/* Header */}
                    <div
                        className="px-5 py-4 flex items-center gap-3 border-b border-white/5"
                        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(34,211,238,0.10))" }}
                    >
                        {/* Avatar */}
                        <div className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #22d3ee, #7c3aed)" }}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.096.04A2.25 2.25 0 0117.25 13.5h.649" />
                            </svg>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070a12]" />
                        </div>

                        <div>
                            <p className="text-white font-semibold text-sm font-mono">Kanniselvakumar's Assistant</p>
                            <p className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Online · Portfolio assistant
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-auto text-slate-600 hover:text-slate-300 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar dot */}
                                {msg.role === "assistant" && (
                                    <div className="w-6 h-6 rounded-full shrink-0 mt-1 flex items-center justify-center text-xs"
                                        style={{ background: "linear-gradient(135deg, #22d3ee, #7c3aed)" }}>
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                )}

                                <div
                                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "text-white rounded-tr-sm"
                                        : "text-slate-200 rounded-tl-sm border border-white/5"
                                        }`}
                                    style={
                                        msg.role === "user"
                                            ? { background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }
                                            : { background: "rgba(255,255,255,0.04)" }
                                    }
                                >
                                    {renderText(msg.content)}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #22d3ee, #7c3aed)" }}>
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </div>
                                <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm border border-white/5 text-sm text-[var(--accent)] font-mono"
                                    style={{ background: "rgba(255,255,255,0.04)" }}>
                                    Thinking{dots}
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick questions */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-2 flex flex-wrap gap-2">
                            {quickQuestions.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => {
                                        setInput(q);
                                        setTimeout(() => sendMessage(), 50);
                                        setInput(q);
                                    }}
                                    className="text-xs font-mono text-[var(--accent)]/80 border border-white/10 rounded-full px-3 py-1 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask about Kanni..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-slate-600 font-mono focus:outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.07] transition-all duration-200"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                            style={{ background: "linear-gradient(135deg, #22d3ee, #7c3aed)" }}
                        >
                            <svg className="w-4 h-4 text-white translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }
      `}</style>
        </>
    );
}