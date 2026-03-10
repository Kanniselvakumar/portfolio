// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────
// Place this file at:  src/app/api/contact/route.ts
// Install dep:         npm install nodemailer @types/nodemailer
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // ── Validation ──────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Transporter ─────────────────────────────────────────
    // Gmail SMTP — uses an App Password, NOT your Gmail login.
    // Generate one at: Google Account → Security → 2FA → App Passwords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // e.g. k.kanniselvakumar@gmail.com
        pass: process.env.GMAIL_PASS, // 16-char App Password
      },
    });

    // ── Shared color tokens (portfolio palette) ──────────────
    // bg:      #030712  (hero/page bg)
    // surface: #040e1c  (section bg)
    // card:    #071428  (card bg)
    // border:  rgba(6,182,212,0.15)  (cyan-500/15)
    // accent:  #06b6d4  (cyan-500)
    // accent2: #3b82f6  (blue-500)
    // text:    #f8fafc  (slate-50)
    // muted:   rgba(148,163,184,0.6) (slate-400/60)

    // ── 1. Notification email → YOU ─────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <style>
            *{box-sizing:border-box;margin:0;padding:0}
            body{background:#030712;font-family:'Segoe UI',system-ui,sans-serif;color:#f8fafc;-webkit-font-smoothing:antialiased}
            .wrap{max-width:580px;margin:40px auto;background:#040e1c;border:1px solid rgba(6,182,212,0.15);border-radius:14px;overflow:hidden}

            /* Header */
            .hdr{background:linear-gradient(135deg,#030712 0%,#040e1c 50%,#071428 100%);padding:32px 36px;border-bottom:1px solid rgba(6,182,212,0.12);position:relative;overflow:hidden}
            .hdr::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%);border-radius:50%;pointer-events:none}
            .logo-wrap{display:flex;align-items:center;gap:10px;margin-bottom:10px}
            .logo-icon{width:32px;height:32px;border:1px solid rgba(6,182,212,0.4);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#06b6d4;font-family:monospace;font-weight:700;background:rgba(6,182,212,0.06);line-height:32px;text-align:center}
            .logo-text{font-size:.95rem;font-weight:700;color:#f8fafc;font-family:monospace}
            .logo-text span{color:#06b6d4}
            .badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:20px;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:#06b6d4;font-family:monospace}
            .badge::before{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:#06b6d4;animation:none}

            /* Body */
            .body{padding:32px 36px}
            .field{margin-bottom:20px}
            .lbl{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(148,163,184,0.5);margin-bottom:6px;font-family:monospace}
            .val{font-size:.88rem;color:#e2e8f0;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 16px;line-height:1.65}
            .val a{color:#06b6d4;text-decoration:none}
            .val a:hover{text-decoration:underline}
            .msg{white-space:pre-wrap;word-break:break-word;border-left:2px solid rgba(6,182,212,0.4);border-radius:0 8px 8px 0;background:rgba(6,182,212,0.04)}

            /* Divider */
            .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(6,182,212,0.12),transparent);margin:8px 0 24px}

            /* Footer */
            .ftr{padding:16px 36px;border-top:1px solid rgba(255,255,255,0.04);font-size:.67rem;color:rgba(148,163,184,0.35);text-align:center;font-family:monospace}
            .ftr span{color:#06b6d4}
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="hdr">
              <div class="logo-wrap">
                <div class="logo-icon">~/</div>
                <div class="logo-text"><span>kanni</span>.dev</div>
              </div>
              <div class="badge">✦ New Portfolio Message</div>
            </div>

            <div class="body">
              <div class="field">
                <div class="lbl">From</div>
                <div class="val">${name}</div>
              </div>
              <div class="field">
                <div class="lbl">Email</div>
                <div class="val"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${subject ? `
              <div class="field">
                <div class="lbl">Subject</div>
                <div class="val">${subject}</div>
              </div>` : ""}
              <div class="divider"></div>
              <div class="field">
                <div class="lbl">Message</div>
                <div class="val msg">${message.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>

            <div class="ftr">
              Sent from your portfolio &nbsp;·&nbsp; <span>k.kanniselvakumar@gmail.com</span>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ── 2. Auto-reply → SENDER ──────────────────────────────
    await transporter.sendMail({
      from: `"Kanniselvakumar K" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out! 👋",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <style>
            *{box-sizing:border-box;margin:0;padding:0}
            body{background:#030712;font-family:'Segoe UI',system-ui,sans-serif;color:#f8fafc;-webkit-font-smoothing:antialiased}
            .wrap{max-width:580px;margin:40px auto;background:#040e1c;border:1px solid rgba(6,182,212,0.15);border-radius:14px;overflow:hidden}

            /* Header */
            .hdr{background:linear-gradient(135deg,#030712 0%,#040e1c 60%,#071428 100%);padding:40px 36px 32px;text-align:center;border-bottom:1px solid rgba(6,182,212,0.1);position:relative;overflow:hidden}
            .hdr::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:300px;height:200px;background:radial-gradient(ellipse,rgba(6,182,212,0.07) 0%,transparent 70%);pointer-events:none}
            .avatar{width:58px;height:58px;border-radius:50%;border:1.5px solid rgba(6,182,212,0.35);background:rgba(6,182,212,0.08);margin:0 auto 14px;font-size:1.5rem;line-height:58px;text-align:center;position:relative}
            .avatar::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(6,182,212,0.12)}
            .logo-text{font-size:1.1rem;font-weight:800;color:#f8fafc;font-family:monospace}
            .logo-text span{color:#06b6d4}
            .tagline{margin-top:6px;font-size:.72rem;color:rgba(148,163,184,0.45);font-family:monospace;letter-spacing:.08em}

            /* Body */
            .body{padding:36px;text-align:center}
            h2{font-size:1.2rem;font-weight:800;color:#f8fafc;margin-bottom:12px}
            .hi{color:#06b6d4}
            p{color:rgba(148,163,184,0.7);font-size:.87rem;line-height:1.85;margin-bottom:14px}
            .accent{color:#06b6d4;font-weight:600}

            /* Quote card */
            .quote-card{background:rgba(6,182,212,0.04);border:1px solid rgba(6,182,212,0.12);border-left:3px solid rgba(6,182,212,0.5);border-radius:0 8px 8px 0;padding:16px 18px;text-align:left;margin:22px 0;font-size:.82rem;color:rgba(148,163,184,0.55);line-height:1.75;font-style:italic}

            /* CTA button */
            .btn-wrap{margin-top:6px}
            .btn{display:inline-block;padding:11px 28px;background:#06b6d4;color:#030712;border-radius:7px;font-weight:700;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;font-family:monospace}

            /* Divider */
            .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(6,182,212,0.1),transparent);margin:8px 0}

            /* Footer */
            .ftr{padding:16px 36px;border-top:1px solid rgba(255,255,255,0.04);font-size:.67rem;color:rgba(148,163,184,0.3);text-align:center;font-family:monospace;line-height:1.8}
            .ftr a{color:rgba(6,182,212,0.6);text-decoration:none}
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="hdr">
              <div class="avatar">👨‍💻</div>
              <div class="logo-text"><span>kanni</span>.dev</div>
              <div class="tagline">Full-Stack Developer &amp; AI Enthusiast</div>
            </div>

            <div class="body">
              <h2>Hey <span class="hi">${name}</span>! 👋</h2>
              <p>
                Thanks for dropping a message on my portfolio.<br/>
                I've received your note and will get back to you
                <span class="accent">within 24–48 hours</span>.
              </p>

              <div class="divider"></div>

              <div class="quote-card">
                "${message.length > 120 ? message.slice(0, 120) + "…" : message}"
              </div>

              <p style="font-size:.8rem">
                In the meantime, feel free to check out my work on GitHub or connect on LinkedIn.
              </p>

              <div class="btn-wrap">
                <a class="btn" href="${process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/"}">
                  Connect on LinkedIn →
                </a>
              </div>
            </div>

            <div class="ftr">
              Kanniselvakumar K &nbsp;·&nbsp; Chennai, Tamil Nadu<br/>
              <a href="mailto:k.kanniselvakumar@gmail.com">k.kanniselvakumar@gmail.com</a>
              &nbsp;·&nbsp; +91 7539929300
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}