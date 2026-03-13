// app/lib/data.ts
import {
  personalInfo,
  skills,
  projects,
  education,
  certifications,
} from "../data/data";

export function getPortfolioContext(): string {
  const skillsList = skills
    .map((category) => {
      const items = category.items.map((item) => item.name).join(", ");
      return "  • " + category.category + ": " + items;
    })
    .join("\n");

  const projectList = projects
    .map((p) => {
      let text =
        "  • " +
        p.title +
        "\n    " +
        p.description +
        "\n    Tags: " +
        p.tags.join(", ") +
        "\n    GitHub: " +
        p.github;

      if (p.live) {
        text += "\n    Live: " + p.live;
      }

      return text;
    })
    .join("\n\n");

  const educationList = education
    .map((e) => {
      return (
        "  • " +
        e.degree +
        " — " +
        e.institution +
        ", " +
        e.location +
        " (" +
        e.period +
        ") | Score: " +
        e.score
      );
    })
    .join("\n");

  const certificationList = certifications
    .map((c) => "  • " + c.title + " by " + c.issuer)
    .join("\n");

  return `
PORTFOLIO DATA FOR ${personalInfo.name.toUpperCase()}
═══════════════════════════════════

── IDENTITY ──
Name:     ${personalInfo.name}
Role:     ${personalInfo.title}
Tagline:  ${personalInfo.tagline}

── ABOUT ──
${personalInfo.bio}

── SKILLS ──
${skillsList}

── PROJECTS ──
${projectList}

── EDUCATION ──
${educationList}

── CERTIFICATIONS ──
${certificationList}

── CONTACT ──
Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
Location: ${personalInfo.location}
GitHub:   ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
`;
}