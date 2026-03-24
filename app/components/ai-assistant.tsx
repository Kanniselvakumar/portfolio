"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Hi! I am Kanniselvakumar's assistant. Ask about his skills, projects, resume download, certificates, or how to get in touch.";

const assistantGradient =
  "linear-gradient(135deg, rgba(34,211,238,0.98), rgba(236,72,153,0.92))";
const assistantPanelSurface =
  "linear-gradient(180deg, rgba(7,10,18,0.98), rgba(10,14,24,0.98))";
const assistantButtonSurface =
  "linear-gradient(180deg, rgba(9,13,22,0.98), rgba(12,17,29,0.98))";
const userBubbleSurface =
  "linear-gradient(135deg, rgba(16,24,38,0.96), rgba(34,22,40,0.94))";
const quickQuestionSurface =
  "linear-gradient(135deg, rgba(13,22,33,0.92), rgba(24,21,37,0.92))";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: WELCOME_MESSAGE,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((value) => (value.length >= 3 ? "." : `${value}.`));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(timeoutId);
  }, [open]);

  const sendMessage = async (messageOverride?: string) => {
    const text = (messageOverride ?? input).trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const history = messages.filter(
      (message, index) => !(index === 0 && message.content === WELCOME_MESSAGE)
    );

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      let data: { answer?: string; error?: string } | null = null;

      try {
        data = (await response.json()) as { answer?: string; error?: string };
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ?? `Request failed with status ${response.status}.`
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.answer ?? "Sorry, I could not get a response. Please try again.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Oops! ${error.message}`
              : "Oops! Something went wrong. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index} className="font-semibold text-[var(--accent)]">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const quickQuestions = [
    "Can I download his resume?",
    "Tell me about his projects",
    "Where can I view certificates?",
    "How can I contact him?",
  ];

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5">
        {!open && (
          <div className="relative mr-1 animate-float-soft">
            <div
              className="relative overflow-hidden rounded-full border px-3.5 py-2"
              style={{
                background: assistantPanelSurface,
                borderColor: "rgba(34,211,238,0.20)",
                boxShadow:
                  "0 14px 30px rgba(0,0,0,0.32), 0 0 16px rgba(34,211,238,0.08)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(236,72,153,0.08))",
                }}
              />
              <p className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-soft" />
                Ask Anything
              </p>
              <div
                aria-hidden="true"
                className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r"
                style={{
                  background: "rgba(9,13,22,0.98)",
                  borderColor: "rgba(34,211,238,0.20)",
                }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((value) => !value)}
          className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
          style={{
            background: open ? assistantGradient : assistantButtonSurface,
            borderColor: open
              ? "rgba(236,72,153,0.32)"
              : "rgba(34,211,238,0.20)",
            boxShadow: open
              ? "0 18px 36px rgba(236,72,153,0.22), 0 0 24px rgba(34,211,238,0.10)"
              : "0 16px 34px rgba(0,0,0,0.42), 0 0 22px rgba(34,211,238,0.10)",
          }}
          aria-label="Toggle AI Assistant"
        >
          {!open && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-[20px] border border-[rgba(34,211,238,0.16)] animate-assistant-glow"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.10), rgba(236,72,153,0.10))",
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[24px] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(236,72,153,0.12))",
                }}
              />
            </>
          )}

          <span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-white"
            style={{
              background: open
                ? "rgba(255,255,255,0.14)"
                : assistantGradient,
              boxShadow: open
                ? "none"
                : "0 10px 20px rgba(34,211,238,0.18)",
            }}
          >
            {open ? (
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 1.357 2.059l.096.04A2.25 2.25 0 0 1 17.25 13.5h.649M9.75 3.104A23.963 23.963 0 0 1 12 3c.97 0 1.927.057 2.867.166M3 16.5v.75A2.25 2.25 0 0 0 5.25 19.5h1.5M3 16.5h2.25M21 16.5v.75A2.25 2.25 0 0 1 18.75 19.5h-1.5M21 16.5h-2.25M12 19.5V21m0-1.5a2.25 2.25 0 0 0 2.25-2.25M12 19.5a2.25 2.25 0 0 1-2.25-2.25m4.5 0h-4.5"
                />
              </svg>
            )}
          </span>

          {!open && (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border border-[#070a12] bg-[var(--accent)] animate-pulse-soft" />
          )}
        </button>
      </div>

      <div
        className={`fixed bottom-20 right-4 z-50 w-[332px] max-w-[calc(100vw-1.5rem)] transition-all duration-500 ease-out sm:right-5 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <div
          className="overflow-hidden rounded-[24px] border backdrop-blur-xl"
          style={{
            background: assistantPanelSurface,
            borderColor: "rgba(255,255,255,0.10)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.46), 0 0 28px rgba(34,211,238,0.10)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
          >
            <div
              className="absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl"
              style={{ background: "rgba(236,72,153,0.12)" }}
            />
            <div
              className="absolute -left-8 top-24 h-32 w-32 rounded-full blur-3xl"
              style={{ background: "rgba(34,211,238,0.10)" }}
            />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "radial-gradient(circle at top right, black 0%, transparent 70%)",
              }}
            />
          </div>

          <div
            className="relative flex items-center gap-3 border-b border-white/5 px-4 py-3.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.10), rgba(236,72,153,0.12))",
            }}
          >
            <div
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10"
              style={{
                background: assistantGradient,
                boxShadow: "0 10px 18px rgba(34,211,238,0.16)",
              }}
            >
              <svg
                className="h-4.5 w-4.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 1.357 2.059l.096.04A2.25 2.25 0 0 1 17.25 13.5h.649"
                />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#070a12] bg-[var(--accent)]" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-mono text-sm font-semibold text-white">
                Kanniselvakumar&apos;s Assistant
              </p>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-soft" />
                Online | Portfolio guide
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="ml-auto rounded-full border border-white/10 bg-white/5 p-1.5 text-slate-300 transition-colors hover:border-[var(--primary)]/35 hover:text-white"
              aria-label="Close assistant"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="scrollbar-thin relative h-72 space-y-3 overflow-y-auto px-4 py-4 scrollbar-track-transparent scrollbar-thumb-white/10">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.role === "assistant" && (
                  <div
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(236,72,153,0.16))",
                    }}
                  >
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-tr-sm border text-slate-50"
                      : "rounded-tl-sm border text-slate-100"
                  }`}
                  style={
                    message.role === "user"
                      ? {
                          background: userBubbleSurface,
                          borderColor: "rgba(236,72,153,0.22)",
                          boxShadow:
                            "0 14px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }
                      : {
                          background: "rgba(255,255,255,0.045)",
                          borderColor: "rgba(34,211,238,0.12)",
                          boxShadow:
                            "0 12px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }
                  }
                >
                  {renderText(message.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(236,72,153,0.16))",
                  }}
                >
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm border px-4 py-2.5 font-mono text-sm text-[var(--accent)]"
                  style={{
                    background: "rgba(255,255,255,0.045)",
                    borderColor: "rgba(34,211,238,0.12)",
                  }}
                >
                  Thinking{dots}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => void sendMessage(question)}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-medium text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{
                    borderColor: "rgba(34,211,238,0.18)",
                    background: quickQuestionSurface,
                    boxShadow:
                      "0 10px 18px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Kanni..."
              className="flex-1 rounded-full border px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.055)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: assistantGradient,
                boxShadow: "0 12px 24px rgba(236,72,153,0.16)",
              }}
              aria-label="Send message"
            >
              <svg
                className="translate-x-px text-white"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes assistant-glow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.04); opacity: 0.82; }
        }

        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.82); opacity: 0.6; }
        }

        .animate-assistant-glow { animation: assistant-glow 2.8s ease-in-out infinite; }
        .animate-float-soft { animation: float-soft 2.8s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 1.8s ease-in-out infinite; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }
      `}</style>
    </>
  );
}
