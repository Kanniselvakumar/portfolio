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
        (e.period || (e.current ? "Current" : "")) +
        ") | Score: " +
        (e.score || "N/A")
      );
    })
    .join("\n");

  const certificationList = certifications
    .map((c) => "  • " + c.title + " by " + c.issuer)
    .join("\n");

  return (
    "\nPORTFOLIO DATA FOR " +
    personalInfo.name.toUpperCase() +
    "\n═══════════════════════════════════\n" +
    "\n── IDENTITY ──\n" +
    "Name:     " + personalInfo.name + "\n" +
    "Role:     " + personalInfo.title + "\n" +
    "Tagline:  " + personalInfo.tagline + "\n" +
    "\n── ABOUT ──\n" +
    personalInfo.bio + "\n" +
    "\n── SKILLS ──\n" +
    skillsList + "\n" +
    "\n── PROJECTS ──\n" +
    projectList + "\n" +
    "\n── EDUCATION ──\n" +
    educationList + "\n" +
    "\n── CERTIFICATIONS ──\n" +
    certificationList + "\n" +
    "\n── CONTACT ──\n" +
    "Email:    " + personalInfo.email + "\n" +
    "Phone:    " + personalInfo.phone + "\n" +
    "Location: " + personalInfo.location + "\n" +
    "GitHub:   " + personalInfo.github + "\n" +
    "LinkedIn: " + personalInfo.linkedin + "\n"
  );
}