// src/app/api/assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
    personalInfo,
    skills,
    projects,
    certifications,
    education,
} from "../../../data/data";

// ── Build a rich system prompt from data.ts ──────────────────

function buildSystemPrompt(): string {
    const skillList = skills
        .map((c) => `  • ${c.category}: ${c.items.map((s) => `${s.name} (${s.level}%)`).join(", ")}`)
        .join("\n");

    const projectList = projects
        .map(
            (p) =>
                `  • ${p.title} — ${p.description}\n    Tags: ${p.tags.join(", ")}\n    GitHub: ${p.github}${p.live ? `\n    Live: ${p.live}` : ""}`
        )
        .join("\n\n");

    const certList = certifications
        .map((c) => `  • ${c.title} — ${c.issuer}`)
        .join("\n");

    const educationList = education
        .map(
            (e) =>
                `  • ${e.degree} — ${e.institution}, ${e.location}${e.score ? ` | Score: ${e.score}` : ""}${e.period ? ` (${e.period})` : ""}${e.current ? " [Currently Enrolled]" : ""}`
        )
        .join("\n");

    return `You are an AI assistant embedded in ${personalInfo.name}'s personal portfolio website.
Your sole purpose is to answer questions about ${personalInfo.name} based on the verified data below.
Be conversational, friendly, and concise (2–4 sentences unless more detail is asked).
If something isn't covered in the data, say so honestly — never fabricate information.
Always refer to ${personalInfo.name} in the third person or use "he/his".
You may use **bold** for emphasis in your responses.

═══════════════════════════════════
  PORTFOLIO DATA FOR ${personalInfo.name.toUpperCase()}
═══════════════════════════════════

── IDENTITY ──
Name:     ${personalInfo.name}
Title:    ${personalInfo.title}
Tagline:  ${personalInfo.tagline}
Location: ${personalInfo.location}
Status:   Available for opportunities

── BIO ──
${personalInfo.bio}

── SKILLS ──
${skillList}

── PROJECTS ──
${projectList}

── CERTIFICATIONS ──
${certList}

── EDUCATION ──
${educationList}

── CONTACT ──
Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
Location: ${personalInfo.location}
GitHub:   ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
`;
}

// ── Message type ─────────────────────────────────────────────

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

// ── POST handler ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, history = [] }: { message: string; history: ChatMessage[] } = body;

        if (!message?.trim()) {
            return NextResponse.json({ error: "Message is required." }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("GROQ_API_KEY is not set.");
            return NextResponse.json(
                { error: "AI service is not configured." },
                { status: 503 }
            );
        }

        // Build message history for multi-turn context (keep last 10 turns)
        const messages: ChatMessage[] = [
            ...history.slice(-10),
            { role: "user", content: message },
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: 512,
                messages: [
                    { role: "system", content: buildSystemPrompt() },
                    ...messages,
                ],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Groq API error:", err);
            return NextResponse.json(
                { error: "AI service unavailable. Please try again later." },
                { status: 502 }
            );
        }

        const data = await response.json();
        const answer =
            data.choices?.[0]?.message?.content ??
            "I couldn't generate a response. Please try again.";

        return NextResponse.json({ answer });
    } catch (error) {
        console.error("Assistant route error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}