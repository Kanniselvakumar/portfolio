// data.ts — Portfolio Data for Kanniselvakumar K

export const personalInfo = {
    name: "Kanniselvakumar K",
    title: "Software Developer",
    tagline: "Building clean code & innovative solutions",
    email: "k.kanniselvakumar@gmail.com",
    phone: "+91 7539929300",
    location: "Chennai, Tamil Nadu",
    github: "https://github.com/Kanniselvakumar",
    linkedin: "https://www.linkedin.com/in/kanniselvakumar-k-31aa06315/",
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
            { name: "NLTK", level: 80 },
            { name: "TextBlob", level: 70 },
            { name: "Scikit-learn", level: 60 },
            { name: "MySQL", level: 80 },
        ],
    },
    {
        category: "Database",
        items: [
            { name: "MySQL", level: 80 },
        ],
    },
    {
        category: "Developer Tools",
        items: [
            { name: "Git", level: 80 },
            { name: "GitHub", level: 85 },
            { name: "VS Code", level: 70 },
        ],
    },
    {
        category: "Core Concepts",
        items: [
            { name: "Data Structures", level: 80 },
            { name: "OOP", level: 85 },
            { name: "NLP / ML", level: 70 },
            { name: "DBMS", level: 90 },
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "FitGuard – AI-Based Athlete Health & Injury Risk Monitoring",
        description:
            "An AI-powered sports analytics platform that tracks athlete training sessions, calculates fatigue scores, and predicts injury risk in real time — helping coaches and athletes make smarter, data-driven decisions.",
        highlights: [
            "Built a Random Forest model to predict injury risk from training load, fatigue scores, and historical performance data.",
            "Developed interactive dashboards with real-time recovery tracking and AI-driven training recommendations for performance optimization.",
            "Integrated MySQL for session history and athlete profiles; exposed REST APIs via Flask consumed by a React.js frontend.",
        ],
        tags: ["Python", "Flask", "MySQL", "React.js", "Scikit-learn", "Pandas", "NumPy"],
        github: "https://github.com/Kanniselvakumar/fitguard-ai-athlete-injury-monitoring",
        live: "https://fitguard-frontend.onrender.com",
        featured: true,
        icon: "🛡️",
        image: "/fitguard-cover.png",
    },
    {
        id: 2,
        title: "Plastic Cleanup & Sales System",
        description:
            "A full-stack sustainability platform that connects volunteers with local eco-cleanup events and drives recycled-product sales through an integrated marketplace — making environmental action measurable and rewarding.",
        highlights: [
            "Designed volunteer coordination flows with role-based access, event registration, and attendance tracking.",
            "Implemented gamification (badges, leaderboards, eco-points) and real-time impact tracking to boost volunteer engagement.",
            "Built a product marketplace for recycled goods powered by Flask + MySQL with cart, checkout, and inventory management.",
        ],
        tags: ["Flask", "MySQL", "HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/Kanniselvakumar/Plastic-cleanup-and-sales-system",
        live: "https://plastic-cleanup-and-sales-system.onrender.com",
        featured: true,
        icon: "🌿",
        image: "/plastic-cleanup-cover.png",
    },
    {
        id: 3,
        title: "Survey Response Summarization using NLP",
        description:
            "An intelligent NLP pipeline that ingests large volumes of open-ended survey responses and automatically surfaces key themes, sentiments, and actionable insights — eliminating hours of manual review.",
        highlights: [
            "Applied text preprocessing (tokenization, stopword removal, lemmatization) using NLTK to clean and normalize raw responses.",
            "Performed sentiment analysis with TextBlob and topic modeling with Scikit-learn to extract key insights from unstructured data.",
            "Generated structured summary reports with sentiment distribution charts and topic clusters for quick decision-making.",
        ],
        tags: ["Python", "NLP", "NLTK", "TextBlob", "Scikit-learn"],
        github: "https://github.com/Kanniselvakumar/survey-response-summarization-nlp",
        live: "https://survey-response-summarization-nlp.onrender.com",
        featured: true,
        icon: "🧠",
        image: "/survey-nlp-cover.png",
    },
];

export const experiences = [
    {
        id: 1,
        company: "JPMorgan Chase & Co.",
        role: "Software Engineering Virtual Internship",
        period: "Nov 2025 - Jan 2026",
        type: "Virtual Experience",
        logo: "JP",
        icon: "🏦",
        color: "from-blue-900/30 to-blue-800/10",
        accentColor: "rgba(0,48,135,0.15)",
        borderColor: "rgba(0,48,135,0.4)",
        logoColor: "#4a90d9",
        description:
            "Completed a software engineering job simulation through Forage, gaining hands-on experience with enterprise-grade backend technologies used at JPMorgan Chase. Worked on real-world tasks including setting up project infrastructure, integrating Kafka for event-driven communication, and designing REST API controllers",
        tasks: [
            "Project Setup & Configuration",
            "Kafka Integration",
            "H2 In-Memory Database Integration",
            "REST API Integration",
            "REST API Controller Design",
        ],
        certificate: {
            url: "/jp_morgan_certificate.pdf",
            label: "View Certificate",
        },
    },
    {
        id: 2,
        company: "Amazon Web Services",
        role: "AWS Cloud Virtual Internship",
        period: "Jun 2025 - Sep 2025",
        type: "Virtual Experience",
        logo: "AWS",
        icon: "☁️",
        color: "from-orange-900/20 to-yellow-800/10",
        accentColor: "rgba(255,153,0,0.10)",
        borderColor: "rgba(255,153,0,0.35)",
        logoColor: "#FF9900",
        description:
            "Completed an AWS Cloud virtual internship through Forage, gaining practical exposure to cloud architecture and infrastructure design. Worked with core AWS services including EC2, S3, and Lambda, applying best practices in cloud security and serverless computing.",
        tasks: [
            "Cloud Fundamentals & Architecture",
            "AWS Core Services (EC2, S3, Lambda)",
            "Cloud Security Best Practices",
            "Serverless Computing",
            "Cloud Deployment & Monitoring",
        ],
        certificate: {
            url: "/AWS Virtual internship certificate.pdf",
            label: "View Certificate",
        },
    },
    {
        id: 3,
        company: "EduSkills Academy",
        role: "Machine Learning & Data Science Internship",
        period: "Jan 2026 - Mar 2026",
        type: "Virtual Experience",
        logo: "EA",
        icon: "🤖",
        color: "from-green-900/20 to-emerald-800/10",
        accentColor: "rgba(16,185,129,0.10)",
        borderColor: "rgba(16,185,129,0.35)",
        logoColor: "#10b981",
        description:
            "Completed a comprehensive 10-week internship credential program in Machine Learning & Data Science. Gained practical experience in data preprocessing, exploratory data analysis, and building machine learning models. Built a capstone project on Customer Sentiment Analysis and Reporting for E-commerce.",
        tasks: [
            "Data Science & Python Libraries (NumPy, Pandas)",
            "Machine Learning (Scikit-learn, Supervised & Unsupervised)",
            "Text Data Handling & Basic NLP",
            "Model Deployment (Flask) & MLOps",
            "Data Storytelling & Dashboards (Power BI)",
        ],
        certificate: {
            url: "/eduskills_certificate.pdf",
            label: "View Certificate",
        },
    },
];

export const education = [
    {
        degree: "MCA",
        institution: "SRM Institute of Science and Technology",
        location: "Chennai",
        period: "2025 – 2027",
        score: "9.5 CGPA",
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
        period: "2021-2022",
        score: "86.7%",
        current: false,
    },
    {
        degree: "SSLC",
        institution: "PKNMHSS",
        location: "Madurai",
        period: "2019-2020",
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
        url: "/Programming In Java.pdf",
    },
    {
        title: "Data Analyst",
        issuer: "IBM (Coursera)",
        icon: "📊",
        color: "from-blue-500/20 to-cyan-500/10",
        url: "/Coursera K8PKCM1Z02WC.pdf",
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
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];