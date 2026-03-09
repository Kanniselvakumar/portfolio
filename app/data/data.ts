// data.ts — Portfolio Data for Kanniselvakumar K

export const personalInfo = {
    name: "Kanniselvakumar K",
    title: "Software Developer",
    tagline: "Building clean code & innovative solutions",
    email: "k.kanniselvakumar@gmail.com",
    phone: "+91 7539929300",
    location: "Madurai, Tamil Nadu",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    resumeUrl: "/resume.pdf",
    bio: "I'm a passionate MCA student at SRM Institute of Science and Technology, focused on building scalable software and data-driven solutions. I love turning complex problems into elegant, efficient code.",
};

export const skills = [
    {
        category: "Languages",
        items: [
            { name: "Java", level: 80 },
            { name: "Python", level: 85 },
            { name: "PHP", level: 65 },
        ],
    },
    {
        category: "Web Technologies",
        items: [
            { name: "HTML5", level: 90 },
            { name: "CSS3", level: 85 },
            { name: "JavaScript", level: 75 },
        ],
    },
    {
        category: "Frameworks & Tools",
        items: [
            { name: "Flask", level: 75 },
            { name: "Next.js", level: 60 },
            { name: "MySQL", level: 80 },
        ],
    },
    {
        category: "Core Concepts",
        items: [
            { name: "Data Structures", level: 80 },
            { name: "OOP", level: 85 },
            { name: "NLP / ML", level: 70 },
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "Plastic Cleanup & Sales System",
        description:
            "A full-stack platform to organize eco-cleanup events and promote recycled products. Features volunteer coordination, gamification, real-time impact tracking, and a marketplace.",
        tags: ["Flask", "MySQL", "HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/",
        live: "",
        featured: true,
        icon: "🌿",
    },
    {
        id: 2,
        title: "Survey Response Summarization (NLP)",
        description:
            "An NLP-based system that automatically analyzes and summarizes large volumes of open-ended survey responses using sentiment analysis and topic modeling.",
        tags: ["Python", "NLTK", "TextBlob", "Scikit-learn", "NLP"],
        github: "https://github.com/",
        live: "",
        featured: true,
        icon: "🧠",
    },
];

export const education = [
    {
        degree: "MCA",
        institution: "SRM Institute of Science and Technology",
        location: "Chennai",
        period: "2025 – 2027",
        current: true,
    },
    {
        degree: "B.Sc Computer Science",
        institution: "Thiagarajar College",
        location: "Madurai",
        period: "2022 – 2025",
        score: "78.14%",
        current: false,
    },
    {
        degree: "HSC",
        institution: "PKNMHSS",
        location: "Madurai",
        period: "",
        score: "86.7%",
        current: false,
    },
    {
        degree: "SSLC",
        institution: "PKNMHSS",
        location: "Madurai",
        period: "",
        score: "85.8%",
        current: false,
    },
];

export const certifications = [
    {
        title: "Programming in Java (Elite)",
        issuer: "NPTEL",
        icon: "☕",
        color: "from-orange-500/20 to-amber-500/10",
    },
    {
        title: "Data Analyst",
        issuer: "IBM (Coursera)",
        icon: "📊",
        color: "from-blue-500/20 to-cyan-500/10",
    },
    {
        title: "AI Revolution in Payment",
        issuer: "Workshop",
        icon: "🤖",
        color: "from-cyan-500/20 to-teal-500/10",
    },
];

export const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];