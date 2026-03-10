"use client";

import { useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  email,
}: {
  email: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const canSubmit = useMemo(() => {
    return (
      state !== "submitting" &&
      values.name.trim().length >= 2 &&
      values.email.includes("@") &&
      values.message.trim().length >= 10
    );
  }, [state, values]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setState("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Failed to send message.");
      }

      setState("success");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="card card-hover rounded-2xl p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-white">Send a message</p>
        <a
          href={`mailto:${email}`}
          className="text-xs text-[var(--accent)]/90 hover:text-[var(--accent)]"
        >
          Prefer email? {email}
        </a>
      </div>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs text-slate-300">Name</span>
            <input
              value={values.name}
              onChange={(e) =>
                setValues((v) => ({ ...v, name: e.target.value }))
              }
              placeholder="Your name"
              className="h-10 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-slate-500 outline-none ring-0 focus:border-[var(--accent)]/50 focus:bg-black/30"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-300">Email</span>
            <input
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              placeholder="you@example.com"
              className="h-10 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-slate-500 outline-none ring-0 focus:border-[var(--accent)]/50 focus:bg-black/30"
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-xs text-slate-300">Message</span>
          <textarea
            value={values.message}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
            placeholder="Tell me about your project or opportunity..."
            rows={5}
            className="resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none ring-0 focus:border-[var(--accent)]/50 focus:bg-black/30"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold btn-primary shine transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {state === "submitting" ? "Sending..." : "Send message"}
          </button>

          {state === "success" && (
            <p className="text-sm text-emerald-300">
              Message sent. Thanks — I&apos;ll get back to you soon.
            </p>
          )}
          {state === "error" && (
            <p className="text-sm text-rose-300">
              {error || "Could not send message."}
            </p>
          )}
          {state === "idle" && (
            <p className="text-xs text-slate-400">
              Tip: include what you need, timeline, and your contact details.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

