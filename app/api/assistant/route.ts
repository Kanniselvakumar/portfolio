import { NextRequest, NextResponse } from "next/server";
import {
  certifications,
  education,
  experiences,
  navLinks,
  personalInfo,
  projects,
  skills,
} from "../../data/data";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ProviderMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function buildSystemPrompt(): string {
  const skillList = skills
    .map(
      (category) =>
        `- ${category.category}: ${category.items
          .map((skill) => `${skill.name} (${skill.level}%)`)
          .join(", ")}`
    )
    .join("\n");

  const projectList = projects
    .map(
      (project) =>
        `- ${project.title}: ${project.description}\n  Tags: ${project.tags.join(
          ", "
        )}\n  GitHub: ${project.github}${
          project.live ? `\n  Live: ${project.live}` : ""
        }`
    )
    .join("\n\n");

  const experienceList = experiences
    .map(
      (experience) =>
        `- ${experience.company}: ${experience.role} (${experience.period})\n  ${
          experience.description
        }\n  Tasks: ${experience.tasks.join(", ")}`
    )
    .join("\n\n");

  const certificationList = certifications
    .map(
      (certification) =>
        `- ${certification.title} (${certification.issuer})`
    )
    .join("\n");

  const educationList = education
    .map(
      (entry) =>
        `- ${entry.degree} at ${entry.institution}, ${entry.location}${
          entry.score ? ` | Score: ${entry.score}` : ""
        }${entry.period ? ` | ${entry.period}` : ""}${
          entry.current ? " | Currently enrolled" : ""
        }`
    )
    .join("\n");

  const navigationList = navLinks
    .map((link) => `- ${link.label}: ${link.href}`)
    .join("\n");

  const certificationLinks = certifications
    .filter((certification) => Boolean(certification.url))
    .map(
      (certification) =>
        `- ${certification.title}: ${certification.url}`
    )
    .join("\n");

  const experienceCertificateLinks = experiences
    .filter((experience) => Boolean(experience.certificate?.url))
    .map(
      (experience) =>
        `- ${experience.company}: ${experience.certificate?.label} -> ${experience.certificate?.url}`
    )
    .join("\n");

  return `You are an AI assistant embedded in ${personalInfo.name}'s portfolio.
Answer only with information supported by the portfolio data below.
Be conversational and concise. Prefer 2-4 sentences unless the user asks for more detail.
If the answer is not in the portfolio data, say that clearly and do not invent details.
Refer to ${personalInfo.name} in the third person or with he/his.
You may use Markdown bold for emphasis.
You should also help visitors use the portfolio website itself, including navigation, buttons, downloads, contact options, and certificate links.

IDENTITY
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Tagline: ${personalInfo.tagline}
Location: ${personalInfo.location}
Bio: ${personalInfo.bio}

SKILLS
${skillList}

PROJECTS
${projectList}

EXPERIENCE
${experienceList}

CERTIFICATIONS
${certificationList}

EDUCATION
${educationList}

SITE FEATURES
Top navigation sections:
${navigationList}

Primary actions:
- Resume button in the top bar opens ${personalInfo.resumeUrl}
- Download Resume button in the hero section downloads ${personalInfo.resumeUrl}
- View projects button jumps to #projects
- Contact button and Let's talk button open email to ${personalInfo.email}
- GitHub button opens ${personalInfo.github}
- LinkedIn button opens ${personalInfo.linkedin}
- Contact section includes a form with name, email, and message fields

Certification document links:
${certificationLinks || "- No direct certification files listed"}

Experience certificate links:
${experienceCertificateLinks || "- No direct experience certificate files listed"}

CONTACT
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}`;
}

function getApiKey(): string | undefined {
  return process.env.GROQ_API_KEY ?? process.env.groq_api_key;
}

function listItems(items: string[], connector = ", "): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(connector)}, and ${items.at(-1)}`;
}

function buildSkillsAnswer(): string {
  const categorySummary = skills.map(
    (category) =>
      `${category.category}: ${category.items
        .map((skill) => skill.name)
        .join(", ")}`
  );

  return `${personalInfo.name}'s skills cover ${listItems(categorySummary)}. His stronger areas include Java, Python, HTML, CSS, JavaScript, Flask, MySQL, and core CS fundamentals like OOP, DBMS, and data structures.`;
}

function buildProjectsAnswer(): string {
  const projectSummary = projects.map(
    (project) => `${project.title} (${project.tags.slice(0, 3).join(", ")})`
  );

  return `${personalInfo.name} has worked on ${listItems(projectSummary)}. The projects focus on AI-assisted health monitoring, sustainability workflows, and NLP-based survey analysis, and you can jump to them with the "View projects" button or the Projects section.`;
}

function buildExperienceAnswer(): string {
  const experienceSummary = experiences.map(
    (experience) =>
      `${experience.role} at ${experience.company} in ${experience.period}`
  );

  return `${personalInfo.name}'s recent experience includes ${listItems(
    experienceSummary
  )}. That work centers on backend setup, REST APIs, cloud services, and event-driven systems.`;
}

function buildEducationAnswer(): string {
  const currentEducation = education.find((entry) => entry.current);
  const previousEducation = education
    .filter((entry) => !entry.current)
    .slice(0, 2)
    .map((entry) => `${entry.degree} from ${entry.institution}`);

  if (!currentEducation) {
    return `${personalInfo.name}'s education details are listed on the portfolio, including formal academic qualifications in computer science.`;
  }

  return `${personalInfo.name} is currently pursuing ${currentEducation.degree} at ${currentEducation.institution} in ${currentEducation.location}. Earlier qualifications include ${listItems(previousEducation)}.`;
}

function buildCertificationAnswer(): string {
  const names = certifications.map(
    (certification) => `${certification.title} from ${certification.issuer}`
  );

  return `${personalInfo.name}'s certifications include ${listItems(
    names
  )}. They reflect coursework in Java, data analysis, and AI-related topics, and certificate cards with files open their PDFs directly from the Certifications section.`;
}

function buildResumeAnswer(): string {
  return `Yes. You can use the "Download Resume" button in the hero section to download ${personalInfo.name}'s resume directly. The top bar also has a "Resume" button that opens the same file at ${personalInfo.resumeUrl}.`;
}

function buildContactAnswer(): string {
  return `You can contact ${personalInfo.name} through the Contact section form by filling in your name, email, and message. You can also use the "Contact" or "Let's talk" buttons for email, call ${personalInfo.phone}, or open his GitHub and LinkedIn links.`;
}

function buildNavigationAnswer(): string {
  const sectionNames = navLinks.map((link) => link.label);

  return `The portfolio is organized into ${listItems(sectionNames)} sections. You can use the top navigation to jump between them, and the hero area also includes quick actions for projects, resume download, email, GitHub, and LinkedIn.`;
}

function buildCertificateLinksAnswer(): string {
  const certificationNames = certifications
    .filter((certification) => certification.url)
    .map((certification) => certification.title);
  const experienceNames = experiences
    .filter((experience) => experience.certificate?.url)
    .map((experience) => experience.company);

  return `Yes. The Certifications section has direct document links for ${listItems(
    certificationNames
  )}, and the Experience section includes "View Certificate" links for ${listItems(
    experienceNames
  )} where available.`;
}

function buildSiteFeaturesAnswer(): string {
  return `You can use this portfolio to view projects, download the resume, open GitHub and LinkedIn, send a message through the contact form, and open certificate PDFs from the Certifications and Experience sections. The top navigation also jumps to Home, About, Skills, Projects, Experience, Certifications, and Contact.`;
}

function buildDefaultAnswer(): string {
  return `${personalInfo.name} is a ${personalInfo.title} based in ${personalInfo.location} and currently pursuing an MCA at SRM Institute of Science and Technology. You can ask about his skills, projects, experience, education, certifications, contact details, or site features like resume download and certificate links.`;
}

function buildFallbackAnswer(message: string): string {
  const prompt = message.toLowerCase();

  if (/(resume|cv|download)/.test(prompt)) {
    return buildResumeAnswer();
  }

  if (/(feature|button|website|site|what can i do|what is available|help me use)/.test(prompt)) {
    return buildSiteFeaturesAnswer();
  }

  if (/(navigate|navigation|section)/.test(prompt)) {
    return buildNavigationAnswer();
  }

  if (
    /(skill|technology|tech stack|stack|tools?|language|framework)/.test(prompt)
  ) {
    return buildSkillsAnswer();
  }

  if (/(project|portfolio work|build|built|developed)/.test(prompt)) {
    return buildProjectsAnswer();
  }

  if (
    /(experience|internship|work|job|company|companies|aws|jpmorgan|forage)/.test(
      prompt
    )
  ) {
    return buildExperienceAnswer();
  }

  if (/(education|study|college|degree|mca|b\.sc|university)/.test(prompt)) {
    return buildEducationAnswer();
  }

  if (/(certification|certificate|course|nptel|coursera|ibm)/.test(prompt)) {
    return /link|download|pdf|open|view/.test(prompt)
      ? buildCertificateLinksAnswer()
      : buildCertificationAnswer();
  }

  if (
    /(contact|email|mail|phone|reach|linkedin|github|location)/.test(
      prompt
    )
  ) {
    return buildContactAnswer();
  }

  if (/(who is|about|introduce|summary|profile)/.test(prompt)) {
    return buildDefaultAnswer();
  }

  return `${buildDefaultAnswer()} If you want something specific, ask about a project, resume download, certificate links, or how to contact him.`;
}

async function generateGroqAnswer(
  apiKey: string,
  message: string,
  history: ChatMessage[]
): Promise<string | null> {
  const messages: ProviderMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...history.slice(-10).map((entry) => ({
      role: entry.role,
      content: entry.content,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 512,
      messages,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq API error:", errorText);
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    const message = body.message?.trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = getApiKey();

    if (apiKey) {
      try {
        const answer = await generateGroqAnswer(apiKey, message, history);

        if (answer) {
          return NextResponse.json({ answer, source: "groq" });
        }
      } catch (error) {
        console.error("Groq request failed, using fallback assistant:", error);
      }
    } else {
      console.warn("GROQ_API_KEY is not configured. Using fallback assistant.");
    }

    return NextResponse.json({
      answer: buildFallbackAnswer(message),
      source: "fallback",
    });
  } catch (error) {
    console.error("Assistant route error:", error);
    return NextResponse.json(
      { error: "Invalid assistant request." },
      { status: 400 }
    );
  }
}
