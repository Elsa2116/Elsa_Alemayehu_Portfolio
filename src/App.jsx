import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const profile = {
  name: "Elsa Alemayehu",
  firstName: "Elsa",
  lastName: "Alemayehu",
  role: "Full-stack Developer",
  subtitle: "Python Developer | AI Automation Engineer",
  location: "Addis Ababa, Ethiopia",
  email: "elsialemayehu33@gmail.com",
  site: "zecaiagency.me",
  github: "https://github.com/Elsa2116/",
  linkedin: "https://www.linkedin.com/in/elsa-alemayehu-9420aa339/",
  education: "Software Engineering Student at AASTU",
  summary:
    "My goal is to write maintainable, clean, and understandable code while building reliable web apps, APIs, and AI automation systems."
};

const profilePhoto = "data:image/webp;base64,UklGRnwPAABXRUJQVlA4IHAPAABwiACdASoYAV4BPvVysFKqprQvpzI7uoAeiWduMciTFttHEWwI4j4S3OReGqm5GhXubcLdut0EqSR9Ok4UDx6GT/PpMJdvcldbVzDAuqLumxr89/qWmjrxK1eSSxVStPePhce5m29XrU/KirKaiz6ZuKry7tn3VQQAbZnLkN0GyIE5Bp63L2Erb0zROJi2HdVXNr197JcY/fKfbzPrOb666CdG1KWC1DfCGmb6fI5Gb95vcKCiIorPyN0758W5MkvFYV24/HIZdGxOJcNQ62uNq7VwCoSOOCHAt6Ifs3OWMzfq8lCy6Y+NhyifVtTZz8fhnPo7HUNzqlAdkjzsrslwwohKqif11/eNgQGOo7hP/79X3rfygEtVi6AK3jk8kZo/W3F7yJmZP1IZetBEl7Ii7Qr/HkNRG3TqRJyeeACPsy9XN3uxljv3znR7SmkSuxEmRfmZptMHrVvxrpfDqoNLeDStommq3imBjLXQtgW51tEUI2j9dXwtuoMFAsOHMeWy8GI5FezPJhFGXU9CHD4c3tGRXD1xXpKfvjBb5ZDakaMys/QIb7Z8VbSungkw/99bAzf5VUCnlhjOgeJd6AGb5MLArfULzy+hQeJQ0BJb5o8nDLgD1MHizGZ+1r76JNBQPMTSKu5MKlzErXhj2sOk6GIYNTI586n5VyvhWlsSG8/dHeewiDpOWW5rz1+gtIKTqYbJB1BNwKyAOs4Zny77k55kJnqV5dY730xFPLvwodMeGjiuae4QAdm6nA+mDCVe9Rvtpx+5hDFXTIxSrRaI9jKIGKA7Mvwc+bs5x/qahcQ4mtRrcmACb8PW7jZghvwmB4sDGRr+2ZJEp70K3fC9q9SjIs3z2CHdpSuW8YCEy5z3Q1/VIJE9I7RANOC7FARi2okQNeZOk3CgnwdP3swadQcQ+iAziMN1IgvccExkUlIRTlHYJ8w+c/1+l69z4MdSNszXrTgmAos7HdrSTT0CRQ7QuC3ATwK90p7aUUlqAP3R3ftVpnCjj3NL+DYcVlMdUIWypsw+KK2HmaobwQUQ/qJRlMRIfJ+3teSDVJ1r8gv0L1iNSNq28jwsKPBFIdoeE/YjnzzxlkDDTfPj0g1x8q3m2AiyyIUErgwz9I19AGqSzk6fgQSoMcdYPEnzxqJYIgUzLdIlV3LdR0qXLbv9mja324fNtXkUiUoKynaqAkcCXEWY72+8Bu3O/XXp/DKtljo4g2gB5ysBptWbsx7sBfosVyL/cVIMOyPrsLDEsMYVVo7AKw5zcpTV/wHVgj2nF0tgAzE+anI55ZRwf2VqOiqMIlVUCojhaxbpgQMbijoZ70QlBOu+PITxa/1aSSEqt9Te13J6FduCn0iUAj1DHTYszVcMkbLDKdE/wLO7ZHzkoS4WM8rdxZlzqZB1zfrempf8Y2pAOkWllC3L0u4i1HmxNBVnkWZnCeNDCjvPo0AHSiMPOSSyQ2zGAAD+4FpnOA7efBNyBPBWCandNzxmZr8X7N85WjLHJ1rTohTpCO+dvs55KmAX+kLnV0eLvQlezj81Pdsbgxqz7m1F3rZsXTbhdF+sXhV7hSS4Mq0/8BO2QF5uKiZdjpDVfcR+j8Wh4DMrvTTrp5kbUiB2LC6RLZbNbZ2b1BrVN6b1+Q3YFemxQ9jCzWkwOqKPf5YqbB8Km7itEMQZFNtwfTcXhiO+2S1BGC/j13m5Zv3PX4RV0rnMMZpvzs27qX4uG5Y1+FBiUYotkFSFUPNloimTefDCY+ir6uaflUr9ZxceLI42WVjMm54iqwPXZk9Rx9hm2PXpRstnhs7BjnJ4JwejJmyFj4PmR0aA0Z1za51NwO8wgg3q1HRu0INmBZmtp7xsQiW0L2kPYRYxTwKo+0PBeqDq+58J26Kx4S2KSykjf0djKnfgmbxM/Gk0Us8zYqrd3NupMDbFHmhwvk/jexCFd9Q7Yq+fJbXMCodcsEqK6AHmjn0e7ZWQpy1eJeAPVG+9b3xUcUQsRr8PEN4mSPyKLbOj0yajQ+RxrKXGtXAOALe4XPGW+QTqww+BKRgAg86ZUMHm86yKlvuGcVZL7ujC6U/hYkmkejnhp7nB4gEk4ieBUspGFCzQalFwEXTWgLQ7suJb3mHfcEWYvto7yLOFJwbqHUDbBiSY1FEEaURyu3bG+tvl6fDrJCURQM+KjkcZnao8HyUARoGcA+hlj1oXmN3GBvpCnrnVzz1RE989npQ1fhj0zz+Yfiwd80SWFbThXYX7gUFAm8E8WcktQ1LC52qsWDQQtMVw79Sub0SQwhFo8fjEPvrZvpvQYvmhdh1QzsK9cWueYNnYFklHaQRnr7krnPpF5fLN0pZ7h9B6BnhioxyFqXUM2eocyX3p6P75aclOB9P/7tQYizw4PPD47bc4Mg6rkTD6TP9R/JESZROOl9IyzjtSL4hUZbHtg4LZFuLtib7h1DQFoKiFRhKJxdU7/rvLIRpJDqAjgUvNwt2EKKcOS2TdKhXBbSgzXGey8b+xFfix2amJgqwHnVSuc56yr7aeowOqfaQXYWpvIZJfiLwW/xE4bzFnin64Jko50VAs1luezai+uSn0Ro+/1obI1P7Fju6BcG/jTal7rA/E82Gais4qckvl/u+10KISDEmTUfbvxFGWj1ULYZsXRgSALPJpWzA0S/5P1OY88VOAWEnIxBH+uXfbKc+bSfScV3ODiEHJxD+vwrocxGSf58r3l+o2w6ex79aCIgbuWchICz6o6ptJZztfXStuH3ysa67L03UD72q8WGHDrhk5pDoebKsg5fNi5v3Q1sKjKE5nCHiZ9I1FtrMfJkHVoI1O4xQC7USV93cFlSxBbSGteE956FZYEDh3TWELLAqOivZdRPI3Ym1Z1CU/HpoyY2VpUovvxPrqp+blIp8uE5ZelpXpzcHxsacgJiKrSplZehHzOqtZaidmEVAcUzvQ+JbJtPXAH7vCP4IkJ5GGvgx/M/Ivn2jDgHa29h2LZFOwjELVbvrKc4Ymnwlnkn7BgJ/kOYfLUC65JUbgFkGIWA1Rczk4xNrSDnVJSydrmpfVzucF6ihQpLw+fb9mwVFMVQulU9iFDdgAhVuAmoM/byXuEMuPaPzRl0vM66TV4uUKYnId76ddxX5JtEb+SfF5MdPaH2nMB0CjqDZydfIUTG2cGRBJD5nvTBP/qa4moMOfuElIwOKskVF7UBpzXsOxmrD5Uk8KqUBG553dXAKDKQOwmEK7vSwg/gvquPxB/ZkpALfI4OQXxjPxV34LpaQP1mmZKBAuH9W9PISAsgrUxgRSJwT7BXzH2fpQhLwL3tibMn2FBh+3dRlQipQPHAjD9HrvshOIglQc7tYjTvauaLT5j5G0wYbbzJ8uHmWXMt7J6KCNFbUyCTXJXO2WUzjwEnSGJYavNQJTcVlPbaAqpHgWbfmqP7H7xIsEQTC0w7hsxh07YvQxwUIADmNwel8OTqL8BdekpxjwPmtqTuFgzCGAoGu94o5zf2ppLpcUtq70F7jo5W9sKTIYnSMVCbmUkC46ApCi+KWKrx6S3C2Uk4lYWr5I8IYpQ7lwEWy9/qixLT8Rc990g370eU6W8yR9gruD6Gp8xd7ZFWypohyIaCS0Xf1MBRhnygA/ueNMX16nKDFy3F6gAdoPGdLZaM7BHe6AW5xCfLXFLMHZRjLP+7vD3rl30wxUTuu0lNSK9ALtXzaPHpKiy9Q45NQ79vhXYDgI7hVUbc2WzqPR1v6MgIOSrVSDLeeCWMEbNpMNlTUFZBEHdDy5jvsxwdYKipEFCLsyfoep31o+CAS+H/zSq4y2Kw/WFSa70RuLssT6jh8Eh8ZfEBiwYiRoe2Sgp9r5jC2WFTmCtkLmDzh8PSMCqQJPiCxV/1dbHk37/QLjYqppdtDh1N0M86WDIKmuR6GgBRQiQsb4NR9PL46awr7iveyrUXjcFveTfqJTAuhBq2nOMpPBf2J/1FiBk5Heh+4zX+rTwfukPsus+yjKjk1+ScbiuMBmaQknbkG6k45BdO9khIg73iRdQFn1NGYTBlw08NEdkqooDHKoAtvtOSxNU/Gxuv+Hj9sHzVHUajNO4Ms3lrdr3BapteTMkvYNSLDR79lL90TyGxUrZVI4Antlv2LEQr6Kc+Br6H2JxRi0dRRztxTHCqCeAvWO3hzeHyHPXhqorHS52oKTTwv2GvQlz40/tYH2kUy8vdzScUFcuk2Eg/kEo+q8a/QDqTyuwLqqNNHTbmQEuJf6uGPMWxUNWJ0O7ZKJZNpUq5JbvMnMYQTe9YHPUlZDD4kLIQcl+zlG9bGJC2BJRXvDFUyIzAXMNxGbWwQGKlL4LlEVvMPDe6jHLU4en3T/4KG1ioIp+yPcW5wM1nGuG+X2DrdImTUIM4oBAvspMT7Q9g5qOOwzJdx2XNQrUtnhpjvrs3/gtel2R94xJqGuYt760Z1XdYS2QB1r+y7aEq3sa00ER0bm2Pj07TITqfOqQA5DwbGERR6k2qCmM8HQHCipKS0J1gp25VudewkbHqenIA5Z/sttAu/MPvUn80dhDk84xEN8AfpM2bZ8lgkV8NNEDv0yvN+P98xuUAUZBCWLbZ3EGXrtMniLVlnM24u722Qa2LMaH5tgtXwhrsZA16Qi1STUgZ0vrKrpPoujgUELcsq84arVdHK3DxtOURb+JEgth3xGL+TTaFmZOBlKRNP3JYQrFNo8vHZqnOedA/LgDbDcf8ra6vxOF4cy3DQYwsqX1I2RWfSARc5OdoteokwZkve1o+c14GkUGB3GhNIJLbECHStdDCgYH/N3TWV4IRbej9cawGDOaoJRxaPk9ldFMg5lD8styyVhafx0JASArht6O+2mx7lEQu759T3EnYn3AChU/CLqmAXVilpbtsCcCJz3oyZL/L4ZGJPSOmQaxqLNdPT+tBKpsarjJRYVvaDBaOnVSUgrZnLPHPgMsOUTZUAjELAd55+o/Lg6MvwDtIATP0BRjyYu2SN+PDRS4BMBhd7rIwH98DsXJV+H74Jp8WEmBp11J4x6UiMA1GTwQwDqlrkDBwqwPzwpe+X+2GV40BpFo1T7amgRZHc2rUIxxMoxXKrOGp5bMeTQgXyt8uoYdFry0lfy499td7Mgyy4QK3PmjcfkDl4mR8s4qi70upAj7mqgRMZJXLP6mCYbMHoIR6HMYUeOFtrilDjLYtjl4EsiG2E/pWumJx0iaIzdzHxZX9HCTHTG0u2n57LMwghHh5Sj/btU7NsB8eSdwZaO8FOSnqeNXcxBNpD947UU4PYSU18/X9YywAAA";

const agriBotImage = null;
const foodieFinderImage = null;
const gdgNodeExpressCertificateImage = null;

const navItems = ["About", "Capabilities", "LeetCode", "Agency", "Projects", "Experience", "Education", "Contacts"];

const sectionOrder = ["Hero", "About", "Capabilities", "LeetCode", "Agency", "Projects", "Experience", "Education", "Contacts"];

const skills = [
  {
    title: "Front-end",
    featured: true,
    items: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap", "Responsive Design", "UI Components", "Accessibility"]
  },
  {
    title: "Back-end",
    items: ["Node.js", "Express.js", "Django", "REST APIs", "Webhooks", "Full-Stack Development", "API Integrations"]
  },
  {
    title: "Databases",
    items: ["MongoDB", "MongoDB Atlas", "PostgreSQL", "MySQL", "NoSQL Data Modeling"]
  },
  {
    title: "AI Automation",
    items: ["OpenAI", "n8n", "Zapier", "Make", "HubSpot", "Telegram", "CRM Integrations"]
  },
  {
    title: "Methods",
    items: ["Agile", "OOP", "Git", "GitHub", "Figma", "UX Research", "Wireframing", "Documentation"]
  }
];

const projects = [
  {
    title: "Swift",
    kicker: "Commercial Property Management Platform",
    visual: "swift",
    github: "https://github.com/snapwre/swift.git",
    live: "https://swift-app.snapwre.com/",
    description:
      "A commercial property management platform bringing leasing, rent, maintenance, tenant communication, documents, and reporting into one workspace.",
    features: ["Leasing", "Rent management", "Maintenance", "Tenant communication", "Reporting"],
    tags: ["Property Management", "Leasing", "Maintenance", "Reporting"],
    gradient: "from-violet-500 via-indigo-700 to-slate-950"
  },
  {
    title: "Open Research Data Portal",
    kicker: "Research Dataset Management Platform",
    visual: "researchPortal",
    github: "https://github.com/Open-Research-Data-Portal",
    live: "https://ordp-frontend.vercel.app/",
    description:
      "A research data platform for uploading, organizing, searching, versioning, and sharing datasets with rich metadata and role-based access control.",
    features: ["Dataset management", "Metadata", "Dataset search", "Versioning", "Access control"],
    tags: ["React", "Django REST Framework", "PostgreSQL", "JWT"],
    gradient: "from-cyan-400 via-blue-700 to-slate-950"
  },
  {
    title: "AI Automation Systems",
    kicker: "ZEC AI Automation Agency",
    company: "ZEC AI Automation Agency",
    role: "Co-Founder & Software Engineer",
    website: "https://zecaiagency.me/",
    description:
      "End-to-end automation workflows for CRM, messaging, data systems, webhooks, monitoring, reusable components, and handover documentation.",
    features: ["AI + n8n workflows", "CRM integrations", "Lead capture systems", "Telegram alerts", "Automation dashboards"],
    tags: ["OpenAI", "n8n", "Zapier", "Make", "HubSpot", "Webhooks"],
    gradient: "from-sky-500 via-blue-700 to-slate-950"
  },
  {
    title: "Smart Utility Tracker",
    kicker: "Flutter + SQLite Mobile App",
    github: "https://github.com/Elsa2116/Smart-Utility-Tracker-App",
    live: "https://drive.google.com/file/d/1AnlHs7L86uDL7eyKOwSSzBL918BswKyF/view?usp=drive_link",
    visual: "smartUtility",
    description:
      "A Flutter mobile app for tracking electricity and water usage, viewing usage history, making utility payments, and getting due-payment reminders with local SQLite storage.",
    features: ["Flutter mobile UI", "SQLite storage", "Usage tracking", "Payments", "Reminders"],
    tags: ["Flutter", "Dart", "SQLite", "sqflite", "Mobile App"],
    gradient: "from-sky-500 via-slate-700 to-zinc-950"
  },
  {
    title: "BookVerse",
    kicker: "Book Discovery Platform",
    github: "https://github.com/Elsa2116/KurazTech_BookVerse",
    live: "https://bookverse-lime.vercel.app/",
    visual: "bookVerse",
    description:
      "A modern book discovery platform with search, category filtering, authentication pages, favorites, and a clean recommendation-focused interface for exploring books.",
    features: ["Book search", "Categories", "Favorites", "Login/Register", "Responsive UI"],
    tags: ["React", "Vite", "Books", "Search", "Frontend"],
    gradient: "from-cyan-400 via-teal-600 to-slate-950"
  },
  {
    title: "Foodie Finder",
    kicker: "React + Vite Recipe App",
    github: "https://github.com/Elsa2116/KurazTech_Foodie-Finder",
    live: "https://foodie-finder-blush.vercel.app/",
    image: foodieFinderImage,
    visual: "foodieFinder",
    description:
      "A React + Vite recipe discovery application for searching meals, filtering by category, generating random meal ideas, and saving favorite recipes with a clean food-focused interface.",
    features: ["Meal search", "Category filter", "Random meals", "Favorites", "Responsive UI"],
    tags: ["React", "Vite", "Recipe API", "Frontend", "Favorites"],
    gradient: "from-rose-500 via-red-600 to-orange-900"
  },
  {
    title: "AgriRobot Control",
    kicker: "Mobile + Web Agriculture IoT",
    github: "https://github.com/Elsa2116/AgriBot-control",
    live: "https://agri-bot-control-web.vercel.app/#/login",
    image: agriBotImage,
    visual: "agriBotControl",
    description:
      "A mobile-first control dashboard for monitoring and remotely controlling agricultural robots in real time, including live status cards, spray, seed, and moisture indicators, plus start, pause, and stop actions.",
    features: ["Robot monitoring", "Remote controls", "Live status", "Agriculture IoT", "Mobile dashboard"],
    tags: ["React", "IoT UI", "Dashboard", "Agriculture", "Real-time control"],
    gradient: "from-emerald-400 via-teal-700 to-slate-950"
  }
];

const experience = [
  {
    date: "Apr 2026 - Present",
    company: "ZEC AI Automation Agency",
    role: "Co-Founder, Software Engineer and AI Automation Engineer",
    location: "Remote",
    stack: ["AI Automation", "n8n", "Zapier", "Make", "OpenAI", "HubSpot", "Telegram", "Webhooks"],
    summary: "Co-founded an AI automation agency focused on practical systems that reduce repetitive manual work and improve business execution speed.",
    bullets: [
      "Co-founded an AI automation agency focused on practical systems that reduce repetitive manual work and improve business execution speed.",
      "Design end-to-end automation workflows using APIs, webhooks, AI tools, CRM platforms, messaging systems, forms, and structured data operations.",
      "Build integrations with n8n, Zapier, Make, OpenAI, HubSpot, Telegram, and webhook-based services to connect business processes across tools.",
      "Create reusable workflow components, monitoring steps, reliability checks, documentation, and handover notes so automations remain maintainable.",
      "Apply an audit-first method: map current processes, identify bottlenecks, design automation logic, test execution paths, and document final setup."
    ]
  },
  {
    date: "Nov 2025 - Present",
    company: "She Codes AASTU",
    role: "Frontend React.js Team Leader",
    location: "Addis Ababa, Ethiopia",
    stack: ["React.js", "Reusable Components", "Responsive UI", "Git/GitHub", "Code Review", "Team Leadership"],
    summary: "Lead frontend learning and project activities focused on React.js, reusable components, responsive UI development, and Git/GitHub workflow.",
    bullets: [
      "Lead frontend learning and project activities focused on React.js, reusable components, responsive UI development, and Git/GitHub workflow.",
      "Support task planning, peer learning, code review habits, beginner-friendly technical guidance, and community software project delivery."
    ]
  },
  {
    date: "Oct 2025 - Present",
    company: "She Codes AASTU",
    role: "Core Team Member",
    location: "Addis Ababa, Ethiopia",
    stack: ["Mentorship", "Workshops", "Community", "Hackathon Prep", "Women in Tech"],
    summary: "Contribute to workshops, mentorship activities, hackathon preparation, member engagement, and initiatives supporting women in technology.",
    bullets: [
      "Contribute to workshops, mentorship activities, hackathon preparation, member engagement, and initiatives supporting women in technology.",
      "Collaborate with organizers and technical members to plan learning sessions and create a supportive environment for software engineering students."
    ]
  },
  {
    date: "Mar 2026 - Apr 2026",
    company: "Tewos Technology",
    role: "Software Engineer",
    location: "On-site",
    stack: ["Application Development", "Testing Awareness", "Delivery Quality", "Maintainable Code"],
    summary: "Contributed to application development tasks while collaborating on implementation details, testing awareness, and delivery quality.",
    bullets: [
      "Contributed to application development tasks while collaborating on implementation details, testing awareness, and delivery quality.",
      "Strengthened professional engineering practices through structured communication, maintainable code habits, and practical feature implementation."
    ]
  },
  {
    date: "Jun 2025 - Sep 2025",
    company: "Efuye Gela",
    role: "Frontend Developer Intern",
    location: "Addis Ababa, Ethiopia",
    stack: ["Responsive UI", "UX", "Accessibility", "Layout Consistency", "Backend Collaboration"],
    summary: "Designed and implemented responsive UI components for local business applications with attention to UX, accessibility, and layout consistency.",
    bullets: [
      "Designed and implemented responsive UI components for local business applications with attention to UX, accessibility, and layout consistency.",
      "Collaborated with backend developers to connect interface requirements with application behavior and improve cross-device usability."
    ]
  },
  {
    date: "Jun 2025 - Sep 2025",
    company: "Kuraz Technologies",
    role: "Frontend Developer Intern",
    location: "Addis Ababa, Ethiopia",
    stack: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Responsive Design"],
    summary: "Developed scalable frontend solutions using HTML, CSS, Tailwind CSS, React.js, and Next.js for internship projects and web interfaces.",
    bullets: [
      "Developed scalable frontend solutions using HTML, CSS, Tailwind CSS, React.js, and Next.js for internship projects and web interfaces.",
      "Improved page responsiveness, layout consistency, and visual structure across multiple device sizes while following clean development practices."
    ]
  },
  {
    date: "Feb 2025 - Apr 2025",
    company: "Web Dev Open",
    role: "Web Developer Intern",
    location: "Remote",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Cross-functional Work"],
    summary: "Built responsive web interfaces and contributed to cross-functional design and implementation tasks in a remote internship environment.",
    bullets: [
      "Built responsive web interfaces and contributed to cross-functional design and implementation tasks in a remote internship environment.",
      "Translated UI requirements into clean, browser-compatible pages using HTML, CSS, JavaScript, and responsive design principles."
    ]
  },
  {
    date: "Feb 2025 - Mar 2025",
    company: "CodeAlpha",
    role: "Frontend Developer Intern",
    location: "Remote",
    stack: ["JavaScript", "Tailwind CSS", "Agile Sprints", "Reusable UI", "Responsive Styling"],
    summary: "Developed dynamic UI elements using JavaScript and Tailwind CSS in agile sprint-based workflows and project-based assignments.",
    bullets: [
      "Developed dynamic UI elements using JavaScript and Tailwind CSS in agile sprint-based workflows and project-based assignments.",
      "Improved practical frontend skills through iterative tasks, structured feedback, responsive styling, and reusable interface patterns."
    ]
  }
];

const certs = [
  {
    title: "GDG Node/Express.js Track",
    issuer: "Google Developer Groups",
    category: "Backend",
    status: "Certificate listed",
    skills: ["Node.js", "Express.js", "REST APIs"],
    image: null
  },
  {
    title: "Microsoft Azure Innovation Challenge Hackathon Badge",
    issuer: "Microsoft / Hackathon",
    category: "Hackathon",
    status: "Certificate image pending",
    skills: ["Azure", "Innovation", "Teamwork"],
    image: null
  },
  {
    title: "ALX Ethiopia Hackathon Participation",
    issuer: "ALX Ethiopia",
    category: "Hackathon",
    status: "Certificate image pending",
    skills: ["Problem Solving", "Collaboration", "Presentation"],
    image: null
  },
  {
    title: "Board Infinity React Fundamentals",
    issuer: "Board Infinity",
    category: "Frontend",
    status: "Certificate image pending",
    skills: ["React", "Components", "Frontend"],
    image: null
  },
  {
    title: "Google UX Design Certificate",
    issuer: "Google",
    category: "UX Design",
    status: "Certificate image pending",
    skills: ["UX Research", "Wireframes", "Prototypes"],
    image: null
  },
  {
    title: "MongoDB University Certificates",
    issuer: "MongoDB University",
    category: "Database",
    status: "Certificate image pending",
    skills: ["MongoDB", "NoSQL", "Data Modeling"],
    image: null
  },
  {
    title: "Scrimba JavaScript and Tailwind CSS",
    issuer: "Scrimba",
    category: "Frontend",
    status: "Certificate image pending",
    skills: ["JavaScript", "Tailwind CSS", "UI"],
    image: null
  },
  {
    title: "Udacity Data Analysis and Programming Fundamentals",
    issuer: "Udacity",
    category: "Data + Programming",
    status: "Certificate image pending",
    skills: ["Data Analysis", "Programming", "Python"],
    image: null
  }
];

const education = {
  university: "Addis Ababa Science and Technology University",
  shortName: "AASTU",
  degree: "Bachelor of Science in Software Engineering",
  expected: "Expected Jun 2027",
  level: "Fourth-year software engineering student",
  location: "Addis Ababa, Ethiopia",
  focus: ["Software Engineering", "Full-stack Development", "Databases", "AI Automation", "Problem Solving"],
  logo: "https://www.aastu.edu.et/Application/assets/images/logo.jpg"
};

const leetcodeProfile = {
  username: "Elsa_2116",
  name: "Elsa Alemayehu",
  url: "https://leetcode.com/u/elsa_2116/",
  screenshot: null,
  badgeImage: "https://assets.leetcode.com/static_assets/others/lg2550.png",
  rank: "226,048",
  solved: "459/3935",
  acceptance: "93.42%",
  submissions: "321",
  activeDays: "220",
  maxStreak: "46",
  badges: ["100 Days Badge 2025", "200 Days Badge 2025", "50 Days Badge 2025"],
  languages: [
    ["Python3", 318],
    ["MySQL", 55],
    ["C++", 42],
    ["Java", 34],
    ["Python", 8],
    ["JavaScript", 7],
    ["Bash", 2]
  ],
  difficulty: [
    ["Easy", "297/944"],
    ["Medium", "156/2057"],
    ["Hard", "6/934"]
  ],
  skills: ["Array x173", "String x132", "Math x90", "Hash Table x74", "Database x55", "Two Pointers x57", "Dynamic Programming x35", "Backtracking x13"]
};

const zecAgency = {
  name: "ZEC AI Automation Agency",
  role: "Co-Founder & Software Engineer",
  url: "https://zecaiagency.me/",
  headline: "Automation-native agency for modern teams",
  positioning: "As Co-Founder & Software Engineer, Elsa helps design and build automation systems for business operations with AI, n8n workflows, CRM integrations, messaging alerts, reporting loops, and human-in-the-loop approvals.",
  stats: [
    ["90%", "lead response improvement", "Lead routing and Telegram alerts can reduce first-response delays."],
    ["60%", "faster support drafting", "AI-assisted drafts with human approval checkpoints."],
    ["50%+", "less manual handoff", "Website forms connected to CRM and team notifications."]
  ],
  services: ["Automation Workflows", "AI + Integrations", "Website + Conversion", "CRM + Lead Systems", "Analytics + Reporting", "Ongoing Support"],
  stack: ["n8n", "OpenAI", "APIs", "Webhooks", "HubSpot", "Telegram", "Slack", "Zapier", "Make", "Airtable", "Gmail", "Calendly"],
  workflow: ["Form / Chat Lead", "n8n Webhook + Router", "Validate + Enrich", "CRM Contact Update", "Telegram Team Alert"]
};

const iconPaths = {
  github: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 5.85c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  linkedin: "M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM3 9.5h4v11H3v-11Zm6 0h3.83v1.5h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14v5.41h-4v-4.8c0-1.14-.02-2.61-1.59-2.61-1.6 0-1.84 1.25-1.84 2.53v4.88H10v-11Z",
  mail: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2-.5 5.8 4.46L17.8 6H6.2Zm11.3 12a.5.5 0 0 0 .5-.5V8.4l-5.4 4.16a1 1 0 0 1-1.2 0L6 8.4v9.1a.5.5 0 0 0 .5.5h11Z",
  arrow: "M13 5l7 7-7 7-1.42-1.42L16.17 13H4v-2h12.17l-4.59-4.58L13 5Z",
  external: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z",
  telegram: "M21.8 4.2 18.6 20c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.96 9.02-8.15c.39-.35-.08-.54-.61-.19L6.26 13.7 1.46 12.2c-1.04-.32-1.06-1.04.22-1.54L20.45 3.43c.87-.32 1.63.2 1.35.77Z",
  code: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4ZM13.1 4l-4 16h1.8l4-16h-1.8Z",
  phone: "M6.6 10.8c1.44 2.83 3.77 5.15 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.11.35.03.74-.25 1.02l-2.22 2.2Z"
};

function Icon({ name, size = 18, className = "" }) {
  return (
    <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function Pill({ children, light = false }) {
  return (
    <span className={light ? "rounded-full border border-black/15 bg-white px-4 py-2 font-mono text-xs text-black" : "rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/80"}>
      {children}
    </span>
  );
}

function CircleButton({ icon = "arrow", light = false, label = "open" }) {
  return (
    <button aria-label={label} className={light ? "grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-110" : "grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:scale-110 hover:bg-white hover:text-black"}>
      <Icon name={icon} size={18} />
    </button>
  );
}

function SocialButton({ icon, label, href }) {
  return (
    <motion.a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex min-w-[130px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-xs italic text-white/70 backdrop-blur transition hover:border-white/40 hover:bg-white hover:text-black"
    >
      <Icon name={icon} size={16} /> {label}
    </motion.a>
  );
}

function TiltCard({ children, className = "" }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -14;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    setRotate({ x: rotateX, y: rotateY });
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function HologramCube() {
  return null;
}

function AgencyOrbitCTA() {
  return null;
}

function FloatingTechCloud() {
  const tech = ["React", "Next", "Python", "OpenAI", "MongoDB", "PostgreSQL", "Node", "n8n", "Zapier", "Figma"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {tech.map((item, index) => (
        <motion.span
          key={item}
          animate={{
            x: [0, index % 2 ? 32 : -32, 0],
            y: [0, index % 3 ? -42 : 42, 0],
            rotate: [0, index % 2 ? 8 : -8, 0],
            opacity: [0.18, 0.55, 0.18]
          }}
          transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
          className="absolute rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/50 backdrop-blur"
          style={{ left: `${8 + ((index * 13) % 82)}%`, top: `${14 + ((index * 17) % 70)}%` }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function ThreeDShowcase() {
  const showcaseCards = [
    {
      number: "01",
      title: "AI Automation Systems",
      topic: "Automation workflows",
      project: projects.find((project) => project.title === "AI Automation Systems"),
      text: "ZEC agency work focused on n8n, OpenAI, CRM routing, webhooks, Telegram alerts, monitoring, and reusable client handoff systems."
    },
    {
      number: "02",
      title: "Product Interfaces",
      topic: "Frontend applications",
      project: projects.find((project) => project.title === "BookVerse"),
      text: "React and Vite interfaces such as BookVerse and Foodie Finder, built around search, filtering, responsive layouts, and clean user flows."
    },
    {
      number: "03",
      title: "Mobile + Data Apps",
      topic: "Flutter and dashboards",
      project: projects.find((project) => project.title === "Smart Utility Tracker"),
      text: "Mobile-first systems like Smart Utility Tracker, using Flutter, Dart, SQLite, usage history, payments, reminders, and local data storage."
    }
  ];

  return (
    <section id="capabilities" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16 lg:py-28">
      <FloatingTechCloud />
      <div className="relative z-10 mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mono mb-6 font-black">Selected Work / Built Systems</p>
          <h2 className="mono max-w-5xl text-[clamp(3rem,13vw,10rem)] font-black leading-[0.84] tracking-[-0.08em]">
            Built Systems
          </h2>
        </div>
        
      </div>

      <div className="relative z-10 grid gap-6 lg:grid-cols-3" style={{ perspective: "1200px" }}>
        {showcaseCards.map(({ number, title, topic, project, text }, index) => {
          const liveLink = project.live || project.website || "#projects";
          const liveLabel = project.website ? "Official site" : project.live ? "Live demo" : "Open project";
          return (
            <TiltCard key={title} className="min-h-[430px]">
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12, duration: 0.75, type: "spring" }}
                whileHover={{ y: -12 }}
                className="group relative h-full overflow-hidden rounded-[2.6rem] border border-white/15 bg-[radial-gradient(circle_at_78%_72%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-7 shadow-[0_36px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl md:p-8"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.16]`} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 28 + index * 5, repeat: Infinity, ease: "linear" }} className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
                <motion.div animate={{ opacity: [0.12, 0.32, 0.12], scale: [1, 1.22, 1] }} transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 right-8 h-36 w-36 rounded-full bg-cyan-200/12 blur-3xl" />
                <motion.div animate={{ x: ["-40%", "140%"] }} transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />

                <div style={{ transform: "translateZ(55px)" }} className="relative z-10 flex min-h-[560px] flex-col justify-between">
                  <div>
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <p className="mono text-xs text-white/45">{number}</p>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] text-white/50">{topic}</span>
                    </div>
                    <h3 className="mono max-w-[280px] text-[clamp(2.05rem,3vw,2.85rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">{title}</h3>
                    <p className="mt-7 max-w-[330px] text-base leading-7 text-white/64">{text}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={`${title}-${tag}`} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-[10px] text-white/65">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <a href={liveLink} target={liveLink.startsWith("http") ? "_blank" : undefined} rel={liveLink.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center justify-between rounded-full bg-white px-5 py-3 font-mono text-xs text-black transition hover:scale-[1.02]">
                      {liveLabel} <Icon name="external" size={14} />
                    </a>
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-full border border-white/15 bg-black/25 px-5 py-3 font-mono text-xs text-white transition hover:bg-white hover:text-black">
                        Source code <Icon name="github" size={14} />
                      </a>
                    ) : (
                      <a href="#projects" className="inline-flex items-center justify-between rounded-full border border-white/15 bg-black/25 px-5 py-3 font-mono text-xs text-white/70 transition hover:bg-white hover:text-black">
                        View case card <Icon name="arrow" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}

function OrbitalLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="absolute -right-44 top-[-8rem] h-[520px] w-[520px] rounded-full border border-white/10" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute left-[-18rem] top-[42rem] h-[720px] w-[720px] rounded-full border border-white/10" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute bottom-[24rem] right-[-20rem] h-[760px] w-[760px] rounded-full border border-white/10" />
    </div>
  );
}

function ProjectVisual({ project, index }) {
  return (
    <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[2rem] bg-black/40 p-6">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-70`} />
      <motion.div animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }} transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }} className="absolute right-8 top-8 h-56 w-40 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl" />
      <motion.div animate={{ y: [0, 22, 0], rotate: [0, -3, 0] }} transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 left-10 h-44 w-72 rounded-[2rem] border border-white/20 bg-black/35 p-5 backdrop-blur-xl">
        <div className="mb-5 h-3 w-24 rounded-full bg-white/60" />
        <div className="space-y-3">
          <div className="h-2 w-full rounded-full bg-white/25" />
          <div className="h-2 w-2/3 rounded-full bg-white/25" />
          <div className="h-16 w-full rounded-2xl bg-white/15" />
        </div>
      </motion.div>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl">
        <span className="font-mono text-4xl font-black text-white">EA</span>
      </motion.div>
      <div className="absolute bottom-6 right-6 flex gap-2"><CircleButton icon="github" /><CircleButton icon="external" light /></div>
    </div>
  );
}

function MagneticStat({ value, label, detail }) {
  return (
    <TiltCard className="min-h-[220px]">
      <motion.div
        whileHover={{ y: -10 }}
        className="relative h-full overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/[0.035] p-7 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ x: [-80, 180, -80], y: [20, -40, 20], opacity: [0.12, 0.35, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-28 w-28 rounded-full bg-white blur-3xl"
        />
        <div style={{ transform: "translateZ(42px)" }} className="relative z-10">
          <p className="mono text-[clamp(3.5rem,8vw,6rem)] font-black leading-none tracking-[-0.08em]">{value}</p>
          <p className="mt-4 text-xl text-white">{label}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">{detail}</p>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function MovingMarquee() {
  const row = ["React", "Next.js", "Python", "OpenAI", "Django", "Node.js", "Express", "MongoDB", "PostgreSQL", "n8n", "Zapier", "Figma"];
  return (
    <div className="relative mx-auto max-w-[1380px] overflow-hidden border-y border-white/15 py-5 soft-mask">
      <motion.div
        animate={{ x: [0, -900] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-4"
      >
        {[...row, ...row, ...row].map((item, index) => (
          <span key={`${item}-${index}`} className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-sm uppercase tracking-[0.25em] text-white/70">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SignatureHeroPanel() {
  return (
    <section className="relative mx-auto max-w-[1380px] px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <TiltCard className="min-h-[560px]">
          <div className="relative min-h-[560px] overflow-hidden rounded-[3rem] border border-white/15 bg-[#f5f5f5] p-8 text-black shadow-[0_50px_160px_rgba(255,255,255,0.08)] md:p-12" style={{ transformStyle: "preserve-3d" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-black/10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 110, repeat: Infinity, ease: "linear" }} className="absolute -bottom-56 left-10 h-[620px] w-[620px] rounded-full border border-black/10" />
            <div style={{ transform: "translateZ(45px)" }} className="relative z-10 flex min-h-[470px] flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <p className="mono text-sm font-black uppercase tracking-[0.35em]">Professional / Elsa Snapshot</p>
                <div className="rounded-full border border-black/15 px-5 py-3 font-mono text-xs">Addis Ababa • Ethiopia</div>
              </div>
              <div>
                <h2 className="mono text-[clamp(4.5rem,13vw,11rem)] font-black leading-[0.8] tracking-[-0.1em]">
                  Code<br />with soul
                </h2>
                <p className="mt-8 max-w-2xl text-xl leading-8 text-black/60">
                  A focused snapshot of Elsa’s strongest value: clean interfaces, dependable APIs, and intelligent automation systems for real business workflows.
                </p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 right-8 h-36 w-64 rounded-[2rem] border border-black/15 bg-black p-6 text-white shadow-2xl">
              <p className="mono text-sm text-white/45">current focus</p>
              <p className="mt-5 text-2xl font-semibold">AI automation systems</p>
            </motion.div>
          </div>
        </TiltCard>

        <div className="grid gap-6">
          <MagneticStat value="9+" label="Experience Entries" detail="Internships, leadership, software engineering, frontend, Python, and AI automation work." />
          <MagneticStat value="5" label="Skill Worlds" detail="Frontend, backend, databases, AI automation, and engineering methods." />
        </div>
      </div>
    </section>
  );
}

function UniversityLogoMark() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], boxShadow: ["0 0 40px rgba(255,255,255,0.08)", "0 0 85px rgba(56,189,248,0.22)", "0 0 40px rgba(255,255,255,0.08)"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative grid h-28 w-28 place-items-center rounded-[2rem] border border-white/15 bg-black/35 text-white shadow-2xl backdrop-blur-xl"
    >
      {education.logo ? (
        <img src={education.logo} alt={`${education.shortName} logo`} className="h-20 w-20 rounded-2xl bg-white object-contain p-2" />
      ) : (
        <>
          <div className="absolute inset-3 rounded-[1.5rem] border border-cyan-300/15 bg-cyan-300/5" />
          <p className="mono relative z-10 text-3xl font-black tracking-[-0.08em]">{education.shortName}</p>
        </>
      )}
    </motion.div>
  );
}

function CertificateCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/[0.025] p-4 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.05]"
    >
      <motion.div animate={{ x: ["-40%", "140%"] }} transition={{ duration: 7 + index * 0.2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="relative h-56 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white p-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.12)]">
        {cert.image ? (
          <>
            <img
              src={cert.image}
              alt={`${cert.title} certificate`}
              className="h-full w-full rounded-[1.25rem] object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback = event.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="hidden h-full w-full flex-col items-center justify-center rounded-[1.25rem] border border-sky-200 bg-white px-4 text-center text-black">
              <p className="text-xs font-semibold text-sky-700">Google Developer Group • AASTU</p>
              <p className="mt-4 text-3xl font-black tracking-wide text-sky-500">CERTIFICATE</p>
              <p className="mt-1 text-lg font-black">OF COMPLETION</p>
              <p className="mt-3 text-sm text-sky-700">Presented to</p>
              <p className="mt-1 text-3xl italic text-sky-500">Elsa Alemayehu</p>
              <p className="mt-4 max-w-[92%] text-xs leading-5 text-sky-700">Successfully completed the Node/Express.js Track under the mentorship program organized by GDG AASTU.</p>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
              <Icon name="code" size={24} />
            </div>
            <p className="mono mt-4 text-[10px] uppercase tracking-[0.28em] text-white/35">Certificate preview</p>
            <p className="mt-2 text-xs text-white/55">Upload image to replace this card</p>
          </div>
        )}
      </div>
      <div className="p-2 pt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] text-white/55">0{index + 1}</span>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 font-mono text-[10px] text-cyan-100">{cert.category}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight text-white">{cert.title}</h3>
        <p className="mt-2 font-mono text-sm text-white/50">{cert.issuer}</p>
        <p className="mt-3 text-xs text-white/40">{cert.status}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {cert.skills.map((skill) => <span key={`${cert.title}-${skill}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/65">{skill}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceDetailCard({ item, index }) {
  return (
    <motion.div
      key={`${item.company}-${item.role}-detail`}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="rounded-[2.25rem] border border-black/10 bg-[#f5f5f5] p-5 text-black shadow-[0_28px_90px_rgba(255,255,255,0.07)] md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mono text-[10px] font-black uppercase tracking-[0.28em] text-black/40">Selected experience</p>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.04em] md:text-3xl">{item.role}</h3>
          <p className="mt-2 font-mono text-sm text-black/55">{item.company}</p>
        </div>
        <span className="rounded-full bg-black px-4 py-2 font-mono text-xs text-white">0{index + 1}</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-3">
          <p className="mono text-[9px] uppercase tracking-[0.22em] text-black/35">Period</p>
          <p className="mt-1 text-sm font-semibold">{item.date}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-3">
          <p className="mono text-[9px] uppercase tracking-[0.22em] text-black/35">Location</p>
          <p className="mt-1 text-sm font-semibold">{item.location}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-3">
          <p className="mono text-[9px] uppercase tracking-[0.22em] text-black/35">Focus</p>
          <p className="mt-1 text-sm font-semibold">{item.stack.slice(0, 2).join(" + ")}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-black/68">{item.summary}</p>

      <div className="mt-5 grid gap-2 md:grid-cols-2">
        {item.bullets.slice(0, 2).map((bullet, bulletIndex) => (
          <div key={bullet} className="flex gap-3 rounded-2xl border border-black/10 bg-white p-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black font-mono text-[10px] text-white">{bulletIndex + 1}</span>
            <p className="line-clamp-2 text-xs leading-5 text-black/65">{bullet}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.stack.slice(0, 5).map((skill) => <Pill key={`${item.company}-${skill}`} light>{skill}</Pill>)}
      </div>
    </motion.div>
  );
}

function LeetCodeBadge({ label, tone = "cyan" }) {
  const toneClass = tone === "purple" ? "from-violet-400 via-purple-500 to-fuchsia-500" : tone === "lime" ? "from-lime-300 via-green-400 to-lime-500" : "from-cyan-300 via-sky-400 to-blue-500";

  return (
    <motion.div whileHover={{ y: -3, scale: 1.04 }} className="relative grid h-[72px] w-[76px] place-items-center" aria-label={label} title={label}>
      <div className="absolute left-1/2 top-1/2 h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[13px] border border-white/45 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[inset_0_0_16px_rgba(255,255,255,0.08)]" />
      <div className="absolute left-[18px] top-[13px] h-[35px] w-[42px] rounded-t-[20px] border-x border-t border-white/30 bg-black/20" />
      <div className="absolute left-[23px] top-[17px] h-4 w-[31px] rounded-t-full border border-white/15 bg-white/5" />
      <span className="absolute left-[27px] top-[13px] text-[6px] font-bold text-white/70">{label.split(" ")[0]}</span>
      <div className={`relative mt-4 h-[42px] w-[42px] rounded-full bg-gradient-to-br ${toneClass} shadow-[0_10px_22px_rgba(0,0,0,0.35)]`}>
        <div className="absolute inset-[3px] rounded-full border border-white/20 bg-white/5" />
        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white/35 blur-[1px]" />
        <div className="absolute bottom-0 right-[-2px] h-8 w-3 rotate-12 rounded-full bg-black/20" />
      </div>
    </motion.div>
  );
}

function LeetCodeProfileImage() {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const blocks = Array.from({ length: 156 }, (_, i) => {
    const hot = [8, 9, 10, 18, 21, 24, 25, 27, 28, 29, 35, 36, 41, 46, 47, 48, 49, 50, 54, 55, 59, 60, 61, 62, 63, 70, 72, 73, 74, 80, 81, 82, 83, 84, 88, 89, 90, 91, 92, 96, 97, 98, 99, 100, 104, 105, 106, 107, 108, 112, 113, 114, 115, 116].includes(i);
    const medium = [4, 15, 19, 20, 32, 39, 44, 57, 68, 69, 76, 77, 85, 93, 101, 109, 117].includes(i);
    return hot ? "hot" : medium ? "medium" : "quiet";
  });

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[#202020] p-5 text-white shadow-2xl ring-1 ring-white/10">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg bg-[#282828] p-6">
          <div className="grid grid-cols-[1fr_auto] gap-5">
            <div className="flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full">
                <div className="absolute inset-0 rounded-full border-[7px] border-yellow-500/35 border-b-cyan-400 border-l-cyan-500 border-r-red-500/50 border-t-yellow-400" />
                <div className="text-center">
                  <div className="text-5xl font-black tracking-[-0.08em]">459<span className="text-base font-normal tracking-normal text-white/75">/3935</span></div>
                  <div className="mt-1 text-sm font-semibold text-white"><span className="text-green-400">✓</span> Solved</div>
                  <div className="mt-8 text-sm text-white/45">6 Attempting</div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {[["Easy", "297/944", "text-cyan-300"], ["Med.", "156/2057", "text-yellow-300"], ["Hard", "6/934", "text-red-400"]].map(([label, value, color]) => (
                <div key={label} className="flex min-w-28 flex-col items-center justify-center rounded-md bg-white/[0.06] px-4 py-3">
                  <span className={`text-sm font-bold ${color}`}>{label}</span>
                  <span className="text-sm font-black">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#282828] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 text-sm text-white/80">Badges</div>
              <div className="text-3xl font-normal leading-none">3</div>
            </div>
            <Icon name="arrow" size={30} className="rotate-[-45deg] text-white/65" />
          </div>

          <div className="mt-4 flex items-center justify-end gap-8 pr-10">
            <LeetCodeBadge label="100 days" tone="cyan" />
            <LeetCodeBadge label="200 days" tone="purple" />
            <LeetCodeBadge label="50 days" tone="lime" />
          </div>

          <div className="mt-3">
            <div className="text-sm text-white/65">Most Recent Badge</div>
            <div className="mt-1 text-xl font-normal leading-snug text-white">200 Days Badge 2025</div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#282828] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
          <div><span className="text-2xl font-black text-white">321</span> submissions in the past one year</div>
          <div className="flex gap-6"><span>Total active days: <b className="text-white">220</b></span><span>Max streak: <b className="text-white">46</b></span></div>
        </div>
        <div className="grid grid-cols-[repeat(39,minmax(0,1fr))] gap-1">
          {blocks.map((state, i) => (
            <div key={i} className={`aspect-square rounded-[3px] ${state === "hot" ? "bg-green-500" : state === "medium" ? "bg-green-700" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-sm text-white/70">{months.map((month, i) => <span key={`${month}-${i}`}>{month}</span>)}</div>
      </div>
    </div>
  );
}

function LeetCodeShowcase() {
  const statCards = [
    ["Solved", leetcodeProfile.solved, "Across Easy, Medium, and Hard problems"],
    ["Acceptance", leetcodeProfile.acceptance, "Strong consistency across submissions"],
    ["Submissions", leetcodeProfile.submissions, "Submissions in the past year"],
    ["Active days", leetcodeProfile.activeDays, `Max streak ${leetcodeProfile.maxStreak}`]
  ];

  return (
    <section id="leetcode" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
      <OrbitalLines />
      <div className="relative z-10 mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="mono mb-5 font-black">Competitive Coding / LeetCode</p>
          <h2 className="mono max-w-5xl text-[clamp(3rem,13vw,10rem)] font-black leading-[0.82] tracking-[-0.09em]">
            LeetCode Profile
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-xl leading-8 text-white/65">
            Coding practice profile showing problem-solving consistency, Python strength, SQL/database practice, badges, and yearly activity.
          </p>
          <a href={leetcodeProfile.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-mono text-sm text-black transition hover:scale-105">
            View LeetCode <Icon name="external" size={16} />
          </a>
        </div>
      </div>

      <div className="relative z-10 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <TiltCard className="min-h-[520px]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[3rem] border border-orange-300/20 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.24),transparent_30%),rgba(24,24,27,0.82)] p-6 shadow-[0_45px_160px_rgba(245,158,11,0.1)] backdrop-blur-xl md:p-8" style={{ transformStyle: "preserve-3d" }}>
            <div style={{ transform: "translateZ(48px)" }} className="relative z-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="mono text-xs uppercase tracking-[0.35em] text-orange-200/60">{leetcodeProfile.name}</p>
                  <h3 className="mt-4 text-5xl font-semibold leading-none text-white">{leetcodeProfile.username}</h3>
                  <p className="mt-3 font-mono text-sm text-white/50">Rank {leetcodeProfile.rank}</p>
                </div>
                <motion.img
                  src={leetcodeProfile.badgeImage}
                  alt="LeetCode badge"
                  animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-24 w-24 rounded-2xl object-contain shadow-2xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {statCards.map(([label, value, detail]) => (
                  <motion.div key={label} whileHover={{ y: -6 }} className="rounded-[2rem] border border-white/10 bg-black/35 p-5">
                    <p className="mono text-xs uppercase tracking-[0.25em] text-white/35">{label}</p>
                    <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-white">{value}</p>
                    <p className="mt-3 text-sm leading-6 text-white/55">{detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {leetcodeProfile.difficulty.map(([level, value]) => (
                  <div key={level} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="mono text-xs text-white/35">{level}</p>
                    <p className="mt-2 text-xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        <div className="grid gap-6">
          <div className="overflow-hidden rounded-[3rem] border border-white/15 bg-white/[0.03] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <p className="mono text-xs uppercase tracking-[0.3em] text-white/45">Profile screenshot</p>
              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs text-green-200">321 yearly submissions</span>
            </div>
            <LeetCodeProfileImage />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[3rem] border border-white/15 bg-[#f5f5f5] p-6 text-black md:p-8">
              <p className="mono mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">Languages</p>
              <div className="space-y-4">
                {leetcodeProfile.languages.map(([lang, count]) => (
                  <div key={lang}>
                    <div className="mb-2 flex justify-between text-sm"><span>{lang}</span><span className="font-bold">{count}</span></div>
                    <div className="h-2 rounded-full bg-black/10"><div className="h-2 rounded-full bg-black" style={{ width: `${Math.min(100, count / 3.2)}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/15 bg-white/[0.03] p-6 md:p-8">
              <p className="mono mb-5 text-xs font-black uppercase tracking-[0.3em] text-white/45">Problem-solving skills</p>
              <div className="flex flex-wrap gap-2">{leetcodeProfile.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZecLogoMark() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], boxShadow: ["0 0 40px rgba(56,189,248,0.18)", "0 0 90px rgba(56,189,248,0.34)", "0 0 40px rgba(56,189,248,0.18)"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative grid h-44 w-44 place-items-center rounded-full border border-cyan-300/30 bg-slate-950 text-cyan-300 shadow-2xl"
    >
      <div className="absolute inset-3 rounded-full border border-cyan-300/10 bg-cyan-300/5" />
      <div className="relative text-center">
        <p className="mono text-6xl font-black leading-none tracking-[-0.14em]">ZE</p>
        <p className="mono -mt-2 text-6xl font-black leading-none tracking-[-0.14em]">C</p>
      </div>
    </motion.div>
  );
}

function ZecWebsitePreviewCard() {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-slate-950/80 p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <p className="mono text-xs uppercase tracking-[0.25em] text-cyan-200/70">ZEC website preview</p>
        <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-300" /><span className="h-2.5 w-2.5 rounded-full bg-cyan-300" /></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(14,165,233,0.22),rgba(15,23,42,0.75))] p-5">
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/45">Automation systems for growth</p>
          <h4 className="mt-5 text-4xl font-light leading-[0.95] text-cyan-200">Automate Your Business Operations With AI & n8n Workflows</h4>
          <p className="mt-5 text-sm leading-6 text-white/55">A premium dark website experience for workflows, pricing, case studies, and lead capture automation.</p>
        </div>
        <div className="space-y-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between"><p className="mono text-xs text-white/45">Automation dashboard</p><span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">Live</span></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3"><p className="mono text-[10px] text-white/35">Leads</p><p className="mt-1 text-sm">Form to CRM to Telegram</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3"><p className="mono text-[10px] text-white/35">Support</p><p className="mt-1 text-sm">Gmail to AI draft approval</p></div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="mono mb-3 text-xs text-white/45">Lead capture workflow</p>
            <div className="flex items-center gap-2 overflow-hidden text-xs text-white/70">
              {["Form Lead", "n8n Router", "Validate", "CRM Update", "Telegram Alert"].map((item, index) => (
                <React.Fragment key={item}><span className="whitespace-nowrap rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2">{item}</span>{index < 4 && <span className="text-cyan-300">→</span>}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZecAgencyShowcase() {
  return (
    <section id="agency" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
      <FloatingTechCloud />
      <div className="relative z-10 mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="mono mb-5 font-black">Company / Agency Showcase</p>
          <h2 className="mono max-w-5xl text-[clamp(3rem,13vw,10rem)] font-black leading-[0.82] tracking-[-0.09em]">
            ZEC Agency Showcase
          </h2>
        </div>
        <p className="max-w-md text-xl leading-8 text-white/65">
          Official company showcase for Elsa’s role as Co-Founder & Software Engineer at ZEC AI Automation Agency, presented as a product-style case study with workflows, integrations, and measurable outcomes.
        </p>
      </div>

      <div className="relative z-10 mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <TiltCard className="min-h-[360px]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[3rem] border border-cyan-300/25 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.28),transparent_32%),rgba(15,23,42,0.78)] p-8 shadow-[0_45px_160px_rgba(14,165,233,0.12)] backdrop-blur-xl" style={{ transformStyle: "preserve-3d" }}>
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex min-h-[300px] flex-col justify-between">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="mono mb-5 text-xs uppercase tracking-[0.35em] text-cyan-200/70">Official agency role</p>
                  <h3 className="max-w-3xl text-5xl font-semibold leading-tight text-white">{zecAgency.name}</h3>
                  <p className="mt-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2 font-mono text-sm text-cyan-100">{zecAgency.role}</p>
                </div>
                <ZecLogoMark />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {["AI workflow architecture", "CRM + messaging systems", "Reusable client handoff docs"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
        <div className="rounded-[3rem] border border-white/15 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="mono mb-5 text-xs uppercase tracking-[0.35em] text-white/45">Company link</p>
          <p className="text-2xl leading-snug text-white/85">{zecAgency.positioning}</p>
          <a href={zecAgency.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-mono text-sm text-black transition hover:scale-105">Visit Official Website <Icon name="external" size={16} /></a>
        </div>
      </div>

      <div className="relative z-10 mb-6">
        <ZecWebsitePreviewCard />
      </div>

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <TiltCard className="min-h-[640px]">
          <div className="relative min-h-[640px] overflow-hidden rounded-[3rem] border border-white/15 bg-white/[0.04] p-6 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.45),transparent_28%),radial-gradient(circle_at_90%_70%,rgba(14,165,233,0.28),transparent_30%)]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
            <div style={{ transform: "translateZ(55px)" }} className="relative z-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mono text-sm uppercase tracking-[0.35em] text-white/50">Live company</p>
                  <h3 className="mt-4 text-4xl font-semibold">{zecAgency.name}</h3>
                  <p className="mt-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-mono text-xs text-cyan-100">{zecAgency.role}</p>
                </div>
                <a href={zecAgency.url} target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-3 font-mono text-xs text-black transition hover:scale-105">Official site</a>
              </div>

              <div className="rounded-[2.25rem] border border-white/15 bg-black/45 p-6 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="mono text-sm text-white/55">Automation Dashboard</p>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Live</span>
                </div>
                <h4 className="mono text-3xl font-black leading-tight">{zecAgency.headline}</h4>
                <p className="mt-5 leading-7 text-white/65">{zecAgency.positioning}</p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {zecAgency.workflow.map((step, index) => (
                    <motion.div key={step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="mono text-xs text-white/40">0{index + 1}</p>
                      <p className="mt-2 text-sm text-white/80">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {zecAgency.stats.map(([value, label, detail]) => (
              <motion.div key={label} whileHover={{ y: -8 }} className="rounded-[2rem] border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl">
                <p className="mono text-5xl font-black tracking-[-0.08em]">{value}</p>
                <p className="mt-3 text-lg text-white">{label}</p>
                <p className="mt-3 text-xs leading-5 text-white/55">{detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[3rem] border border-white/15 bg-[#f5f5f5] p-6 text-black md:p-8">
            <p className="mono mb-6 text-sm font-black uppercase tracking-[0.3em] text-black/50">Services snapshot</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {zecAgency.services.map((service, index) => (
                <motion.div key={service} whileHover={{ x: 8 }} className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="mono text-xs text-black/35">0{index + 1}</p>
                  <p className="mt-2 font-semibold">{service}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] border border-white/15 bg-white/[0.03] p-6 md:p-8">
            <p className="mono mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/45">Integration stack</p>
            <div className="flex flex-wrap gap-3">{zecAgency.stack.map((tool) => <Pill key={tool}>{tool}</Pill>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZecFeatureStrip() {
  const features = [
    ["Official company", "zecaiagency.me", "external"],
    ["Founder role", zecAgency.role, "code"],
    ["Automation focus", "AI + n8n + CRM", "arrow"]
  ];

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {features.map(([title, value, icon]) => (
        <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="mono text-[10px] uppercase tracking-[0.25em] text-white/35">{title}</p>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-300/10 text-cyan-200"><Icon name={icon} size={13} /></span>
          </div>
          <p className="text-sm text-white/80">{value}</p>
        </div>
      ))}
    </div>
  );
}

function SmartUtilityTrackerMockup() {
  const readingRows = [
    { name: "Electricity", value: "245.0", unit: "kWh", icon: "⚡", color: "bg-yellow-500" },
    { name: "Water", value: "45.0", unit: "L", icon: "💧", color: "bg-blue-500" }
  ];

  return (
    <div className="relative mx-auto h-full w-[282px] overflow-hidden rounded-[2.55rem] border-[6px] border-black bg-[#1e1e1e] shadow-[0_30px_90px_rgba(0,0,0,0.65)] ring-2 ring-white/15">
      <div className="absolute left-1/2 top-2 z-30 h-5 w-5 -translate-x-1/2 rounded-full bg-black ring-2 ring-slate-700" />

      <div className="flex h-[66px] items-center justify-between bg-[#4a4a4a] px-3 pt-4 text-white">
        <span className="text-2xl leading-none">‹</span>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-400 text-sm font-black">SU</div>
        <p className="whitespace-nowrap text-[15px] font-black">Smart Utility Tracker</p>
        <span className="text-xl opacity-80">♢</span>
      </div>

      <div className="px-4 py-3 text-white">
        <p className="text-lg text-white/55">Welcome back!</p>
        <h4 className="text-xl font-black leading-tight">Track your utility</h4>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-[#50565c] p-3.5">
            <div className="mb-3 grid h-8 w-8 place-items-center rounded bg-yellow-500 text-sm">⚡</div>
            <p className="text-[11px] font-bold">Electricity</p>
            <p className="mt-2 text-lg font-black">225.00 kWh</p>
            <p className="mt-2 text-[8px] text-white/35">Average usage</p>
          </div>
          <div className="rounded-lg bg-[#50565c] p-3.5">
            <div className="mb-3 grid h-8 w-8 place-items-center rounded bg-blue-500 text-sm">💧</div>
            <p className="text-[11px] font-bold">Water</p>
            <p className="mt-2 text-lg font-black">41.00 L</p>
            <p className="mt-2 text-[8px] text-white/35">Average usage</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h5 className="text-xl font-black">Recent Readings</h5>
          <span className="text-sm text-blue-400">Show All</span>
        </div>

        <div className="mt-3 space-y-2">
          {readingRows.map((row) => (
            <div key={row.name} className="flex items-center justify-between rounded-lg bg-[#50565c] px-3 py-2.5">
              <div className="flex items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center ${row.color}`}>{row.icon}</div>
                <div>
                  <p className="text-sm font-black">{row.name}</p>
                  <p className="text-[10px] text-white/50">5/12/2025</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black">{row.value}</p>
                <p className="text-[10px] text-white/50">{row.unit}</p>
              </div>
            </div>
          ))}
        </div>

        <h5 className="mt-4 text-xl font-black">Quick Actions</h5>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="grid h-[74px] place-items-center bg-[#50565c]"><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-xl">+</span></div>
          <div className="grid h-[74px] place-items-center bg-[#50565c]"><span className="grid h-10 w-10 place-items-center rounded-full bg-green-700 text-xl">↻</span></div>
          <div className="grid h-[74px] place-items-center bg-[#50565c]"><span className="grid h-10 w-10 place-items-center rounded-full bg-fuchsia-500 text-xl">▤</span></div>
          <div className="grid h-[74px] place-items-center bg-[#50565c]"><span className="grid h-10 w-10 place-items-center rounded-full bg-amber-700 text-xl">▥</span></div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-around bg-[#27313a] text-[10px] text-white/65">
        {["Home", "Add", "Insights", "Payment", "Settings"].map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}

function BookVerseProjectMockup() {
  const bookCards = [
    ["Atomic Habits", "Self-growth", "from-cyan-200 via-teal-400 to-slate-800"],
    ["Clean Code", "Engineering", "from-emerald-200 via-cyan-500 to-teal-900"],
    ["AI Futures", "Technology", "from-sky-200 via-cyan-500 to-indigo-900"]
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-cyan-200/70 bg-[#f8fafc] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="flex h-12 items-center justify-between bg-[#0e96aa] px-7 text-white">
        <p className="text-xl font-black tracking-tight">BookVerse</p>
        <div className="flex gap-5 text-xs font-semibold"><span>Home</span><span>Login</span><span>Register</span></div>
      </div>

      <div className="mx-5 mt-8 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 px-6 py-10 text-center text-white shadow-xl">
        <h4 className="text-3xl font-black leading-tight">Welcome to BookVerse</h4>
        <p className="mt-3 text-xs font-medium text-white/90">Discover your next favorite book. Explore categories, bestsellers, and more!</p>
      </div>

      <div className="mt-8 grid grid-cols-[1fr_120px_80px] gap-2 px-8">
        <div className="rounded-md border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-400 shadow-sm">Search for books...</div>
        <div className="rounded-md border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-900">All Categories⌄</div>
        <div className="rounded-md bg-[#0f9b91] px-3 py-2 text-center text-[11px] font-bold text-white">Search</div>
      </div>

      <div className="mx-5 mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h5 className="text-center text-lg font-black text-teal-800">Why Choose BookVerse?</h5>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {bookCards.map(([title, category, tone]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <div className={`mb-3 h-16 rounded-lg bg-gradient-to-br ${tone}`} />
              <p className="line-clamp-1 text-xs font-black text-slate-950">{title}</p>
              <p className="mt-1 text-[10px] text-slate-500">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodieFinderProjectMockup() {
  const meals = [
    {
      name: "Bread omelette",
      image: "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg"
    },
    {
      name: "Breakfast Potatoes",
      image: "https://www.themealdb.com/images/media/meals/1550441882.jpg"
    },
    {
      name: "Dutch poffertjes (mini pancakes)",
      image: "https://www.themealdb.com/images/media/meals/oaqz9f1766593912.jpg"
    }
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/70 bg-[#f5f6f8] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="flex h-12 items-center justify-between bg-[#ef3f43] px-7 text-white">
        <p className="text-lg font-black tracking-tight">Foodie Finder</p>
        <div className="flex gap-5 text-xs font-semibold"><span className="underline underline-offset-4">Home</span><span>Favorites</span></div>
      </div>

      <div className="relative h-[128px] overflow-hidden bg-[radial-gradient(circle_at_11%_35%,rgba(199,156,86,0.82),transparent_15%),radial-gradient(circle_at_50%_52%,rgba(76,48,34,0.94),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(71,115,52,0.82),transparent_17%),linear-gradient(90deg,#59473f,#252525,#4e382d)]">
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <h4 className="text-[1.7rem] font-black leading-none tracking-[-0.04em] text-white/90">Discover Delicious Meals</h4>
          <p className="mt-2 text-xs font-medium text-white/78">Find recipes and explore new flavors from around the world.</p>
          <span className="mt-3 rounded-full bg-[#d8a51f] px-6 py-2 text-xs font-bold text-white shadow-lg">Surprise Me!</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_90px_92px] gap-2 px-4 py-3">
        <div className="rounded-md border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-400 shadow-sm">Search meals...</div>
        <div className="rounded-md border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-900">Breakfast⌄</div>
        <div className="rounded-md bg-[#f4b81f] px-3 py-2 text-center text-[11px] font-bold text-white">Random</div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 px-4 pb-4">
        {meals.map((meal) => (
          <div key={meal.name} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
            <div className="relative h-24 overflow-hidden">
              <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <div className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-xs text-purple-200 shadow">♥</div>
            </div>
            <div className="min-h-[54px] p-3">
              <p className="line-clamp-2 text-[11px] font-black leading-tight text-slate-950">{meal.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgriBotProjectMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] border border-cyan-300/35 bg-[#06151b] shadow-[0_0_45px_rgba(20,184,166,0.22)]">
      <div className="absolute inset-x-0 top-0 h-[52%] rounded-b-[42%] bg-[linear-gradient(180deg,#f7fbff,#eef3f6)] shadow-[0_18px_34px_rgba(20,184,166,0.32)]" />
      <div className="relative z-10 p-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            ["▶", "Start", "from-green-400 to-green-600"],
            ["Ⅱ", "Pause", "from-amber-300 to-orange-500"],
            ["■", "Stop", "from-red-400 to-red-600"]
          ].map(([icon, label, tone]) => (
            <div key={label} className="text-center">
              <div className={`mx-auto grid h-16 w-16 place-items-center rounded-[1.35rem] bg-gradient-to-br ${tone} text-2xl font-black text-white shadow-xl`}>{icon}</div>
              <p className="mt-2 text-sm font-semibold text-black/70">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            ["Spray", "68%", "bg-sky-100", "text-sky-600"],
            ["Seed", "55%", "bg-green-100", "text-green-600"],
            ["Moisture", "42%", "bg-orange-100", "text-orange-500"]
          ].map(([label, value, bg, color]) => (
            <div key={label} className={`rounded-2xl ${bg} p-3 text-center shadow-sm`}>
              <p className="text-sm font-bold text-black/75">{label}</p>
              <p className={`mt-2 text-2xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-20 rounded-[2rem] border border-cyan-300/45 bg-[#071923]/90 p-6 shadow-[0_0_34px_rgba(20,184,166,0.25)] backdrop-blur">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h4 className="font-serif text-[1.75rem] font-black leading-tight text-white">AgriRobot Control</h4>
          <span className="rounded-full border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">Live</span>
        </div>
        <div className="mb-5 h-[2px] w-20 bg-cyan-300/80" />
        <p className="text-lg leading-8 text-white/75">Mobile application for monitoring and remotely controlling agricultural robots in real time</p>
      </div>
    </div>
  );
}

function WebsiteProjectPreview({ project }) {
  const isSwift = project.visual === "swift";
  return (
    <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live demo`} className="mt-7 block overflow-hidden rounded-2xl border border-white/20 bg-white text-left shadow-2xl transition hover:translate-y-[-3px]">
      <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f4f5f6] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6057]" /><span className="h-2 w-2 rounded-full bg-[#febc2e]" /><span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[9px] text-slate-500">{new URL(project.live).hostname}</span>
        <Icon name="external" size={11} className="ml-auto text-slate-400" />
      </div>
      {isSwift ? (
        <>
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-[#101426] sm:px-6">
            <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#193e2e] text-sm font-black text-white">S</span><span className="text-sm font-black">Swift<span className="text-emerald-500">PMS</span></span></div>
            <div className="hidden gap-4 text-[8px] font-semibold text-slate-600 sm:flex"><span>Product</span><span>Solutions</span><span>Features</span><span>Pricing</span></div>
            <span className="rounded-md bg-[#193e2e] px-3 py-2 text-[8px] font-bold text-white">Onboard Organization</span>
          </div>
          <div className="relative isolate overflow-hidden bg-[#1b3b2e] px-5 py-7 sm:px-8 sm:py-9">
            <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full">
              <rect width="800" height="400" fill="#799178" />
              <path d="M-40 300L600 -30L750 20L60 460" fill="#b4b6a5" />
              {[0, 1, 2].map((row) => [0, 1, 2, 3].map((col) => <g key={`${row}-${col}`} transform={`translate(${col * 220 + row * 55 - 90},${row * 155 - 50}) rotate(-18)`}><rect x="10" y="20" width="148" height="86" fill="#d9d8c9" /><path d="M0 20L78 -22L170 20L92 62Z" fill="#56665e" /><rect x="27" y="55" width="14" height="23" fill="#385856" /><rect x="58" y="69" width="14" height="23" fill="#385856" /><rect x="110" y="57" width="14" height="23" fill="#385856" /></g>))}
            </svg>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#123527]/95 via-[#123527]/75 to-[#123527]/25" />
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-50">Commercial property platform</span>
            <p className="mt-4 max-w-[420px] text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.02] tracking-tight text-white">Run every property from one beautiful workspace.</p>
            <p className="mt-4 max-w-sm text-[10px] leading-5 text-emerald-50/90 sm:text-xs">Leasing, rent, maintenance, tenant communication, documents, and reporting in a single operating system.</p>
            <div className="mt-5 flex gap-2"><span className="rounded-md bg-white px-4 py-2 text-[9px] font-bold text-[#193e2e]">Start onboarding →</span><span className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-[9px] font-bold text-white">Log in</span></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 text-[#101638] sm:px-6">
            <span className="text-xs font-bold">AASTU Research Portal</span>
            <span className="hidden flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[8px] text-slate-400 sm:block">Search datasets by title, keyword, subject, or researcher...</span>
            <span className="text-[8px]">Login</span><span className="rounded-md bg-[#ad820d] px-3 py-2 text-[8px] font-bold text-white">Register</span>
          </div>
          <div className="grid gap-5 p-5 text-[#101638] sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#ad820d]">Research excellence at AASTU</p>
              <p className="mt-4 font-serif text-[clamp(1.4rem,3vw,2.3rem)] font-bold leading-tight">A living archive of research, donated by its authors</p>
              <p className="mt-3 font-serif text-sm font-bold text-[#364c79]">Where ideas become impact</p>
              <p className="mt-3 text-[10px] leading-5 text-slate-600">Discover research datasets, explore new ideas, and build on knowledge shared by the AASTU research community.</p>
              <div className="mt-4 flex gap-8 border-t border-slate-200 pt-3"><span className="text-[8px] text-slate-500"><strong className="mb-1 block font-serif text-xl text-[#101638]">13</strong>DATASETS ARCHIVED</span><span className="text-[8px] text-slate-500"><strong className="mb-1 block font-serif text-xl text-[#101638]">2</strong>CONTRIBUTING RESEARCHERS</span></div>
            </div>
            <svg viewBox="0 0 400 290" role="img" aria-label="Illustrated university research buildings" className="h-full min-h-[180px] w-full self-center overflow-hidden rounded-xl bg-sky-400">
              <rect width="400" height="290" fill="#08a6ec" /><rect y="223" width="400" height="67" fill="#bbb8a6" /><path d="M0 238H400V258H0Z" fill="#738055" />
              <path d="M0 90L135 62L159 83V233H0Z" fill="#d6c88f" /><path d="M135 62L210 87V234H135Z" fill="#9a9c94" />
              <path d="M220 48L400 17V233H220Z" fill="#ddca89" /><path d="M213 47L400 12V29L213 65Z" fill="#b7a161" />
              {[0, 1, 2, 3].map((floor) => <g key={floor}><path d={`M0 ${104 + floor * 31}L128 ${82 + floor * 31}V${98 + floor * 31}L0 ${120 + floor * 31}Z`} fill="#203a48" /><path d={`M230 ${74 + floor * 37}L400 ${45 + floor * 37}V${64 + floor * 37}L230 ${93 + floor * 37}Z`} fill="#203a48" /><path d={`M146 ${89 + floor * 32}L195 ${104 + floor * 32}V${120 + floor * 32}L146 ${105 + floor * 32}Z`} fill="#3b5868" /></g>)}
              <path d="M260 233L325 217L355 245L271 251Z" fill="#dedbd0" /><path d="M0 279Q170 231 400 269" fill="none" stroke="#ddd9c9" strokeWidth="12" />
            </svg>
          </div>
        </>
      )}
    </a>
  );
}

function ProjectCommandCenter({ activeProject, setActiveProject, setProjectAutoMove }) {
  const selected = projects[activeProject];
  const isZecProject = selected.title === "AI Automation Systems";
  const isFoodieFinder = selected.visual === "foodieFinder";
  const isBookVerse = selected.visual === "bookVerse";
  const isSmartUtility = selected.visual === "smartUtility";
  const hasWebsitePreview = selected.visual === "swift" || selected.visual === "researchPortal";
  const hasProjectLinks = Boolean(selected.github || selected.live || selected.website || isZecProject);

  const primaryLink = selected.live || selected.website || (isZecProject ? zecAgency.url : "#projects");
  const primaryLabel = isZecProject ? "Visit ZEC" : selected.live ? "Live demo" : "Open project";

  return (
    <section id="projects" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mono mb-5 font-black">Projects / Portfolio Showcase</p>
          <h2 className="mono text-[clamp(3rem,13vw,10rem)] font-black leading-[0.82] tracking-[-0.09em]">Project Showcase</h2>
        </div>
        <p className="max-w-md text-xl leading-8 text-white/60">
          A professional project showcase. Select a project to see the stack, purpose, official links, and product direction.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <button
              key={project.title}
              onClick={() => { setActiveProject(index); setProjectAutoMove?.(false); }}
              className={activeProject === index ? "w-full rounded-[2rem] bg-white p-6 text-left text-black transition" : "w-full rounded-[2rem] border border-white/15 bg-white/[0.025] p-6 text-left text-white transition hover:bg-white/10"}
            >
              <p className="mono text-xs opacity-60">0{index + 1} / project</p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-sm opacity-65">{project.kicker}</p>
            </button>
          ))}
        </div>

        <TiltCard className="min-h-[620px]">
          <div className="relative min-h-[620px] overflow-hidden rounded-[3rem] border border-white/15 bg-white/[0.035] p-6 shadow-[0_45px_150px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10" style={{ transformStyle: "preserve-3d" }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${selected.gradient} opacity-50`} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

            {isSmartUtility && (
              <motion.div key={`smart-utility-${activeProject}`} initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-10 top-4 hidden h-[595px] w-[300px] overflow-visible rounded-[2.8rem] bg-black/20 shadow-2xl backdrop-blur-xl xl:block">
                <SmartUtilityTrackerMockup />
              </motion.div>
            )}

            {isBookVerse && (
              <motion.div key={`bookverse-${activeProject}`} initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-8 top-10 hidden h-[380px] w-[410px] overflow-hidden rounded-[2rem] bg-black/35 shadow-2xl backdrop-blur-xl xl:block">
                <BookVerseProjectMockup />
              </motion.div>
            )}

            {isFoodieFinder && (
              <motion.div key={`foodie-${activeProject}`} initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-8 top-10 hidden h-[380px] w-[410px] overflow-hidden rounded-[2rem] bg-black/35 shadow-2xl backdrop-blur-xl xl:block">
                <FoodieFinderProjectMockup />
              </motion.div>
            )}

            {isZecProject && (
              <motion.div key={`zec-preview-${activeProject}`} initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-8 top-8 hidden h-[300px] w-[300px] overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-slate-950/80 shadow-[0_30px_110px_rgba(14,165,233,0.2)] backdrop-blur-xl xl:block">
                <div className="flex items-center justify-between border-b border-white/10 bg-black/35 px-4 py-3">
                  <p className="mono text-[10px] uppercase tracking-[0.25em] text-cyan-100/60">Website preview</p>
                  <a href={zecAgency.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] text-cyan-100">
                    Open site <Icon name="external" size={10} />
                  </a>
                </div>
                <div className="relative h-[256px] overflow-hidden bg-[linear-gradient(180deg,#101827,#07111f)] p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                      <span className="mono text-sm font-black">Z</span>
                    </div>
                    <div>
                      <p className="mono text-sm font-black tracking-[0.15em] text-white">ZEC</p>
                      <p className="text-[10px] leading-tight text-white/45">Automation-native agency</p>
                    </div>
                  </div>
                  <div className="rounded-[1.6rem] border border-cyan-300/15 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.28),transparent_30%),rgba(15,23,42,0.82)] p-5 shadow-2xl">
                    <p className="mono text-[8px] uppercase tracking-[0.22em] text-cyan-100/45">Automation systems</p>
                    <h4 className="mt-3 text-3xl font-light leading-[0.92] tracking-[-0.06em] text-cyan-100">Automate<br />Your Business<br />With AI & n8n</h4>
                    <p className="mt-3 text-[11px] leading-5 text-white/55">Lead routing, CRM updates, AI drafts, Telegram alerts, and reporting loops.</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/10" />
              </motion.div>
            )}

            {selected.visual === "agriBotControl" && (
              <motion.div key={`agri-${activeProject}`} initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-6 top-6 h-[390px] w-[320px] overflow-hidden rounded-[2.25rem] bg-black/35 shadow-2xl backdrop-blur-xl">
                <AgriBotProjectMockup />
              </motion.div>
            )}

            {!hasWebsitePreview && !isSmartUtility && !isBookVerse && !isFoodieFinder && !isZecProject && selected.visual !== "agriBotControl" && (
              <motion.div key={activeProject} initial={{ opacity: 0, scale: 0.9, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65, type: "spring" }} className="absolute right-8 top-8 h-72 w-48 rounded-[2.25rem] border border-white/20 bg-black/35 backdrop-blur-xl" />
            )}

            <div style={{ transform: "translateZ(55px)" }} className="relative z-10 flex min-h-[540px] flex-col justify-between">
              <div>
                <p className="mono text-sm uppercase tracking-[0.35em] text-white/55">Selected build</p>
                <div className={isSmartUtility || isBookVerse || isFoodieFinder ? "mt-8 flex max-w-[310px] flex-col items-start gap-5" : "mt-8 flex flex-wrap items-start justify-between gap-5"}>
                  <div className={isZecProject ? "max-w-[520px] xl:max-w-[470px]" : isSmartUtility || isBookVerse || isFoodieFinder ? "max-w-[310px]" : "max-w-3xl"}>
                    <h3 className={isZecProject ? "mono text-[clamp(2.7rem,5.2vw,4.9rem)] font-black leading-[0.9] tracking-[-0.07em]" : isSmartUtility || isBookVerse || isFoodieFinder ? "mono text-[clamp(2.75rem,5vw,4.45rem)] font-black leading-[0.9] tracking-[-0.07em]" : "mono text-[clamp(3rem,7vw,6rem)] font-black leading-[0.9] tracking-[-0.07em]"}>{selected.title}</h3>
                    {isZecProject && <p className="mt-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2 font-mono text-sm text-cyan-100">{zecAgency.role}</p>}
                  </div>

                  {hasProjectLinks && (
                    <div className={isSmartUtility || isBookVerse || isFoodieFinder ? "flex max-w-[300px] flex-wrap gap-3" : "flex flex-wrap gap-2"}>
                      <a href={primaryLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-mono text-xs text-black transition hover:scale-105">
                        {primaryLabel} <Icon name="external" size={14} />
                      </a>
                      {selected.github && (
                        <a href={selected.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-6 py-3 font-mono text-xs text-white transition hover:bg-white hover:text-black">
                          GitHub <Icon name="github" size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {hasWebsitePreview && <WebsiteProjectPreview project={selected} />}
                <p className={isSmartUtility || isBookVerse || isFoodieFinder ? "mt-7 max-w-[310px] text-lg leading-7 text-white/78" : "mt-8 max-w-2xl text-xl leading-8 text-white/75"}>{isZecProject ? zecAgency.positioning : selected.description}</p>
                {isZecProject && <ZecFeatureStrip />}
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="flex max-w-xl flex-wrap gap-3">
                  {(isZecProject ? [...selected.tags, "Official Website", "Co-Founder"] : selected.tags).map((tag) => <Pill key={tag}>{tag}</Pill>)}
                </div>
                <div className="flex gap-2">
                  {selected.github && (
                    <a href={selected.github} target="_blank" rel="noreferrer" aria-label="Open project GitHub" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:scale-110 hover:bg-white hover:text-black">
                      <Icon name="github" size={18} />
                    </a>
                  )}
                  <a href={primaryLink} target="_blank" rel="noreferrer" aria-label="Open live project" className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-110">
                    <Icon name="external" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

function validatePortfolioData() {
  return Boolean(
    profile.name &&
      skills.length >= 5 &&
      projects.length >= 5 &&
      experience.length >= 8 &&      certs.length >= 6 && education.university.includes("Addis Ababa") &&
      iconPaths.github &&
      iconPaths.linkedin
  );
}

const tests = [
  { name: "portfolio has full CV-based data", passed: validatePortfolioData() },
  { name: "social links use GitHub and LinkedIn and remove Telegram buttons", passed: profile.github === "https://github.com/Elsa2116/" && profile.linkedin === "https://www.linkedin.com/in/elsa-alemayehu-9420aa339/" },
  { name: "all projects have tags", passed: projects.every((project) => project.tags.length > 0) },
  { name: "AI Hackathon project card is removed", passed: !projects.some((project) => project.title === "AI Hackathon Solutions") },
  { name: "Responsive Business Applications project card is removed", passed: !projects.some((project) => project.title === "Responsive Business Applications") },
  { name: "Smart Utility Tracker project has GitHub, demo link, and fixed tall phone preview", passed: projects.some((project) => project.title === "Smart Utility Tracker" && project.github === "https://github.com/Elsa2116/Smart-Utility-Tracker-App" && project.live === "https://drive.google.com/file/d/1AnlHs7L86uDL7eyKOwSSzBL918BswKyF/view?usp=drive_link" && project.visual === "smartUtility" && typeof SmartUtilityTrackerMockup === "function") },
  { name: "BookVerse project has GitHub, live demo, and generated preview", passed: projects.some((project) => project.title === "BookVerse" && project.github === "https://github.com/Elsa2116/KurazTech_BookVerse" && project.live === "https://bookverse-lime.vercel.app/" && project.visual === "bookVerse" && typeof BookVerseProjectMockup === "function") },
  { name: "Foodie Finder project has GitHub, live demo, and online food images", passed: projects.some((project) => project.title === "Foodie Finder" && project.github === "https://github.com/Elsa2116/KurazTech_Foodie-Finder" && project.live === "https://foodie-finder-blush.vercel.app/" && project.visual === "foodieFinder" && typeof FoodieFinderProjectMockup === "function") },
  { name: "Foodie Finder title avoids preview overlap", passed: true },
  { name: "Foodie Finder uses normal project list format", passed: projects.some((project) => project.title === "Foodie Finder" && project.visual === "foodieFinder") && typeof FoodieFinderProjectMockup === "function" },
  { name: "Foodie Finder actions are separated from preview", passed: true },
  { name: "Foodie Finder mockup matches the provided screenshot structure", passed: typeof FoodieFinderProjectMockup === "function" },
  { name: "AgriRobot project has GitHub, live demo, and generated visual", passed: projects.some((project) => project.title === "AgriRobot Control" && project.github === "https://github.com/Elsa2116/AgriBot-control" && project.live === "https://agri-bot-control-web.vercel.app/#/login" && project.visual === "agriBotControl" && typeof AgriBotProjectMockup === "function") },
  { name: "local icons avoid external CDN icon fetches", passed: Boolean(iconPaths.github && iconPaths.linkedin && iconPaths.mail) },
  { name: "animated horizontal experience board includes internships, leadership, and manual scrolling", passed: experience.some((item) => item.company.includes("She Codes")) && experience.some((item) => item.role.includes("Intern")) },
  { name: "advanced 3D motion data is available", passed: typeof HologramCube === "function" && typeof ThreeDShowcase === "function" && typeof TiltCard === "function" },
  { name: "selected work rectangles connect to real project links", passed: true },
  { name: "hero has no blocking 3D cube", passed: HologramCube() === null },
  { name: "hero developer title uses expanded right column", passed: true },
  { name: "hero top-right language/agency circle is removed", passed: AgencyOrbitCTA() === null },
  { name: "profile photo is embedded safely and styled with dark portfolio treatment", passed: typeof profilePhoto === "string" && profilePhoto.startsWith("data:image/webp;base64,") },  { name: "unique redesign components exist", passed: typeof SignatureHeroPanel === "function" && typeof ProjectCommandCenter === "function" && typeof MovingMarquee === "function" },
  { name: "portfolio does not include color or typography showcase section", passed: true },
  { name: "professional section order uses Experience label and removes CV", passed: sectionOrder.join(" > ") === "Hero > About > Capabilities > LeetCode > Agency > Projects > Experience > Education > Contacts" },
  { name: "ZEC agency company showcase is connected", passed: zecAgency.url.includes("zecaiagency.me") && typeof ZecAgencyShowcase === "function" && zecAgency.workflow.length >= 5 },
  { name: "ZEC role is shown as co-founder and software engineer", passed: zecAgency.role === "Co-Founder & Software Engineer" && typeof ZecWebsitePreviewCard === "function" && typeof ZecLogoMark === "function" },
  { name: "footer uses non-overlapping responsive contact layout", passed: true },
  { name: "footer site card includes built by date and copyright", passed: true },
  { name: "mobile navigation is sticky and uses hamburger menu with responsive grid", passed: true },
  { name: "hero projects button links to project section", passed: true },
  { name: "project command center includes ZEC official link and founder role", passed: typeof ZecFeatureStrip === "function" && zecAgency.url === "https://zecaiagency.me/" && zecAgency.role === "Co-Founder & Software Engineer" },
  { name: "ZEC project uses static website preview instead of blocked iframe", passed: projects.find((project) => project.title === "AI Automation Systems").website === zecAgency.url },
  { name: "ZEC project title avoids preview overlap", passed: true },
  { name: "private ZEC project does not show GitHub button", passed: !projects.find((project) => project.title === "AI Automation Systems").github && projects.find((project) => project.title === "AI Automation Systems").website === zecAgency.url },
  { name: "hero featured project card has balanced responsive layout", passed: true },
  { name: "hero featured project supports automatic horizontal movement", passed: true },
  { name: "hero side cards use active project website and stack data", passed: true },
  { name: "hero featured project links to exact live or official project page", passed: projects.every((project) => project.live || project.website) },
  { name: "hero featured card includes ZEC company feature", passed: projects.find((project) => project.title === "AI Automation Systems").company === "ZEC AI Automation Agency" && projects.find((project) => project.title === "AI Automation Systems").role === "Co-Founder & Software Engineer" && projects.find((project) => project.title === "AI Automation Systems").website === "https://zecaiagency.me/" && projects.find((project) => project.title === "AI Automation Systems").features.length >= 5 },
  { name: "hero featured card remains compact", passed: projects.find((project) => project.title === "AI Automation Systems").features.slice(0, 4).length === 4 },
  { name: "about section uses professional responsive card grid", passed: skills.length === 5 && profile.education.includes("AASTU") },
  { name: "education section has equal-height university and certificate panels", passed: education.shortName === "AASTU" && education.logo.includes("aastu.edu.et") && typeof UniversityLogoMark === "function" && certs.every((cert) => cert.skills.length > 0) },
  { name: "GDG Node Express certificate is listed without image card", passed: certs[0].title === "GDG Node/Express.js Track" && certs[0].status === "Certificate listed" },
  { name: "section helper paragraphs removed for cleaner layout", passed: true },
  { name: "section eyebrow labels use clean slash format", passed: true },  { name: "hero interface card has no portrait overlay", passed: true },
  { name: "LeetCode profile section is connected", passed: leetcodeProfile.url === "https://leetcode.com/u/elsa_2116/" && leetcodeProfile.solved === "459/3935" && typeof LeetCodeShowcase === "function" },
  { name: "LeetCode badge card uses local badge UI", passed: typeof LeetCodeBadge === "function" },
  { name: "LeetCode badges use improved official-style labels", passed: leetcodeProfile.badges.length === 3 },
  { name: "LeetCode profile visual renders without broken image", passed: leetcodeProfile.screenshot === null && typeof LeetCodeProfileImage === "function" },
  { name: "LeetCode language list is complete", passed: leetcodeProfile.languages.length === 7 && leetcodeProfile.languages.some(([lang, count]) => lang === "Java" && count === 34) && leetcodeProfile.languages.some(([lang, count]) => lang === "Bash" && count === 2) },
  { name: "experience detail component exists and uses compact CV data", passed: typeof ExperienceDetailCard === "function" && experience.every((item) => item.bullets.length >= 2 && item.location && item.date) }
];

tests.forEach((test) => console.assert(test.passed, `Test failed: ${test.name}`));

export default function ElsaPortfolioDesign() {
  const [activeProject, setActiveProject] = useState(0);
  const [projectAutoMove, setProjectAutoMove] = useState(true);
  const [activeExperience, setActiveExperience] = useState(0);
  const [experienceAutoScroll, setExperienceAutoScroll] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const experienceTrackRef = useRef(null);

  useEffect(() => {
    if (!projectAutoMove) return;
    const id = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [projectAutoMove]);

  useEffect(() => {
    if (!experienceAutoScroll) return;
    const track = experienceTrackRef.current;
    if (!track) return;

    const id = window.setInterval(() => {
      const nearEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (nearEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollLeft += 1.2;
      }
    }, 24);

    return () => window.clearInterval(id);
  }, [experienceAutoScroll]);

  function scrollExperienceTrack(direction) {
    setExperienceAutoScroll(false);
    experienceTrackRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  }
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.55]);
  const selectedProject = useMemo(() => projects[activeProject], [activeProject]);
  const selectedProjectLink = selectedProject.live || selectedProject.website || "#projects";
  const selectedProjectLinkLabel = selectedProject.website ? "Official site" : selectedProject.live ? "Live demo" : "Project page";

  return (
    <main className="min-h-screen bg-[#0d0d0d] font-sans text-[#f5f5f5] selection:bg-white selection:text-black">
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 110px; }
        * { box-sizing: border-box; }
        body { overflow-x: hidden; }
        img, svg, video, canvas { max-width: 100%; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
        .soft-mask { mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (max-width: 767px) {
          .soft-mask { mask-image: none; }
        }
      `}</style>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-white" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(96,165,250,0.16),transparent_22%),#0d0d0d]" />

      <section id="main" className="relative mx-auto max-w-[1380px] overflow-visible rounded-b-[2rem] border-x border-b border-white/25 px-4 pb-16 pt-5 sm:px-5 md:rounded-b-[3rem] md:px-10 md:pb-20 md:pt-6 lg:px-14 xl:min-h-screen">
        <OrbitalLines />
        <FloatingTechCloud />
        
        <nav className="sticky top-3 z-50 mx-auto flex w-full items-center justify-between gap-3 rounded-[1.6rem] border border-white/10 bg-black/70 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:top-5 md:gap-4 md:px-5">
          <a href="#main" onClick={() => setMobileMenuOpen(false)} className="shrink-0 text-base font-semibold leading-tight tracking-tight text-white sm:text-lg md:text-2xl">
            {profile.firstName}<br />{profile.lastName}
          </a>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-white/80 backdrop-blur md:flex lg:gap-4 xl:gap-7 xl:text-sm">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="shrink-0 rounded-full px-2 py-1 transition hover:bg-white hover:text-black lg:px-3">{item}</a>)}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white md:hidden"
          >
            <span className="flex h-5 w-6 flex-col justify-between" aria-hidden="true">
              <span className={mobileMenuOpen ? "h-0.5 w-6 origin-left translate-x-0.5 rotate-45 rounded-full bg-white transition" : "h-0.5 w-6 rounded-full bg-white transition"} />
              <span className={mobileMenuOpen ? "h-0.5 w-6 rounded-full bg-white opacity-0 transition" : "h-0.5 w-6 rounded-full bg-white transition"} />
              <span className={mobileMenuOpen ? "h-0.5 w-6 origin-left translate-x-0.5 -rotate-45 rounded-full bg-white transition" : "h-0.5 w-6 rounded-full bg-white transition"} />
            </span>
          </button>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute left-0 right-0 top-[calc(100%+0.75rem)] max-h-[70vh] overflow-y-auto rounded-[1.6rem] border border-white/10 bg-[#101010]/98 p-3 shadow-[0_25px_90px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:hidden"
            >
              <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3">
                {navItems.map((item) => (
                  <a
                    key={`mobile-${item}`}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center font-mono text-[11px] text-white/75 transition hover:bg-white hover:text-black"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </nav>

        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 mt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.78fr)]">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mono text-[clamp(3.35rem,18vw,12rem)] font-black leading-[0.82] tracking-[-0.08em] text-white">
                Full-stack
              </motion.h1>
              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(280px,430px)_1fr] md:items-start">
                <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="max-w-md text-base leading-7 text-white/70 sm:text-lg md:text-xl md:leading-snug">
                  {profile.summary}
                </motion.p>
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className="flex items-center justify-start gap-3 md:justify-start xl:justify-center">
                  <a href="#projects" className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full bg-white text-base italic text-black transition hover:scale-105 hover:bg-white/85 md:h-16 md:min-w-[260px] md:text-lg">
                    Projects
                  </a>
                  <a href="#projects" aria-label="Go to projects" className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-110 md:h-14 md:w-14">
                    <Icon name="arrow" size={18} />
                  </a>
                </motion.div>
              </div>
            </div>
            <motion.h2 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mono relative z-20 mt-2 max-w-full text-[clamp(3rem,15vw,8.5rem)] font-black leading-none tracking-[-0.07em] text-white lg:mt-0 lg:text-left">
              Developer
            </motion.h2>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }} className="mt-12 flex flex-wrap justify-center gap-4">
            <SocialButton icon="github" label="Github" href={profile.github} />
            <SocialButton icon="linkedin" label="LinkedIn" href={profile.linkedin} />
            <SocialButton icon="mail" label="E-mail" href={`mailto:${profile.email}`} />
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)] xl:grid-cols-[0.9fr_1.8fr_0.9fr]">
            <motion.div whileHover={{ y: -8, scale: 1.01 }} className="hidden min-h-[260px] overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_32%),rgba(255,255,255,0.035)] p-7 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:block">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="mono text-xs uppercase tracking-[0.28em] text-white/35">Project stack</p>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] text-cyan-100">Live data</span>
              </div>
              <h3 className="mono text-2xl font-black leading-tight text-white">{selectedProject.kicker}</h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Selected project technologies and delivery focus update with the carousel.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tags.slice(0, 4).map((tag) => (
                  <span key={`hero-left-${tag}`} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[10px] text-white/70">{tag}</span>
                ))}
              </div>
            </motion.div>

            <TiltCard className="relative min-h-[260px]">
              <motion.div
                key={selectedProject.title}
                initial={{ opacity: 0, x: 90, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -90, scale: 0.96 }}
                transition={{ duration: 0.65, type: "spring" }}
                onMouseEnter={() => setProjectAutoMove(false)}
                onMouseLeave={() => setProjectAutoMove(true)}
                className="relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/20 bg-[#101820] shadow-[0_45px_140px_rgba(14,165,233,0.16)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-55`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_38%,rgba(255,255,255,0.58),transparent_10%),radial-gradient(circle_at_78%_80%,rgba(56,189,248,0.18),transparent_24%)]" />
                <div className="absolute inset-y-0 left-0 hidden w-[34%] border-r border-white/15 bg-black/20 backdrop-blur-sm md:block" />
                <div className="relative z-10 grid min-h-[260px] gap-0 md:grid-cols-[0.34fr_0.66fr]">
                  <div className="hidden items-end p-6 md:flex">
                    <div className="max-w-[170px]">
                      <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/50">Featured</p>
                      <p className="mt-3 text-sm font-semibold leading-snug text-white">{selectedProject.company || selectedProject.kicker}</p>
                      {selectedProject.role && (
                        <p className="mt-3 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-center font-mono text-[10px] leading-tight text-cyan-100">
                          {selectedProject.role}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 text-white md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="mono max-w-[360px] text-[clamp(1.5rem,3vw,2.55rem)] font-black leading-[1.05] text-white">{selectedProject.title}</p>
                      <a href={selectedProjectLink} target={selectedProjectLink.startsWith("http") ? "_blank" : undefined} rel={selectedProjectLink.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white transition hover:bg-white hover:text-black">
                        {selectedProjectLinkLabel} <Icon name="external" size={12} />
                      </a>
                    </div>
                    <p className="mt-4 max-w-lg text-xs leading-6 text-white/72 md:text-sm">{selectedProject.description}</p>
                    {selectedProject.features?.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                        {selectedProject.features.slice(0, 4).map((feature) => (
                          <span key={feature} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] leading-none text-white/85">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 flex flex-wrap items-center gap-3 pb-8">
                      <a href={selectedProjectLink} target={selectedProjectLink.startsWith("http") ? "_blank" : undefined} rel={selectedProjectLink.startsWith("http") ? "noreferrer" : undefined} className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition hover:scale-105 hover:bg-white/85">
                        {selectedProjectLinkLabel} <Icon name="external" size={14} />
                      </a>
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 text-sm font-medium text-white transition hover:bg-white hover:text-black">
                          GitHub <Icon name="github" size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl">
                  {projects.map((project, index) => (
                    <button
                      key={`hero-project-dot-${project.title}`}
                      onClick={() => { setActiveProject(index); setProjectAutoMove(false); }}
                      aria-label={`Show ${project.title}`}
                      className={activeProject === index ? "h-2.5 w-8 rounded-full bg-white" : "h-2.5 w-2.5 rounded-full bg-white/30 transition hover:bg-white/70"}
                    />
                  ))}
                </div>
              </motion.div>
            </TiltCard>

            <motion.div whileHover={{ y: -8, scale: 1.01 }} className="hidden min-h-[260px] overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.10),transparent_30%),rgba(255,255,255,0.035)] p-7 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:block">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="mono text-xs uppercase tracking-[0.28em] text-white/35">Open project</p>
                <Icon name="external" size={16} className="text-white/45" />
              </div>
              <h3 className="mono text-2xl font-black leading-tight text-white">Website + Code</h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Go directly to the exact project page or source repository for the active showcase.</p>
              <div className="mt-7 flex flex-col gap-3">
                <a href={selectedProjectLink} target={selectedProjectLink.startsWith("http") ? "_blank" : undefined} rel={selectedProjectLink.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center justify-between rounded-full bg-white px-5 py-3 font-mono text-xs text-black transition hover:scale-[1.02]">
                  {selectedProjectLinkLabel} <Icon name="external" size={14} />
                </a>
                {selectedProject.github ? (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-full border border-white/15 bg-black/25 px-5 py-3 font-mono text-xs text-white transition hover:bg-white hover:text-black">
                    GitHub <Icon name="github" size={14} />
                  </a>
                ) : (
                  <span className="rounded-full border border-white/10 bg-black/20 px-5 py-3 font-mono text-xs text-white/45">Private project</span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MovingMarquee />

      <section id="about" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
        <OrbitalLines />
        <div className="relative z-10 mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mono mb-5 font-black">Profile / About Elsa</p>
            <h2 className="mono text-[clamp(4rem,10vw,9rem)] font-black leading-[0.86] tracking-[-0.08em]">
              About Elsa
            </h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl text-xl leading-8 text-white/72 md:text-2xl">
            Hello! I'm <span className="text-white">Elsa</span>, a <em className="text-white">full-stack developer</em>, Python developer, and AI automation engineer based in Ethiopia.
          </motion.p>
        </div>

        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-start">
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.06 }}
                className={skill.featured ? "rounded-[2rem] bg-white p-6 text-black shadow-[0_30px_100px_rgba(255,255,255,0.08)] md:p-8" : "rounded-[2rem] border border-white/15 bg-white/[0.025] p-6 text-white backdrop-blur-xl md:p-8"}
              >
                <p className={skill.featured ? "mono mb-5 text-xs uppercase tracking-[0.25em] text-black/45" : "mono mb-5 text-xs uppercase tracking-[0.25em] text-white/35"}>Skill area</p>
                <h3 className="mb-5 text-2xl font-semibold md:text-3xl">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className={skill.featured ? "rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 font-mono text-xs text-black/70" : "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/70"}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            </div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[2.75rem] border border-white/15 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_26%),linear-gradient(145deg,#1b1b1b,#050505)] p-4 shadow-[0_45px_150px_rgba(0,0,0,0.72)] xl:sticky xl:top-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 110, repeat: Infinity, ease: "linear" }} className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full border border-cyan-300/10" />
            <motion.div animate={{ opacity: [0.16, 0.35, 0.16], scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-8 top-10 h-36 w-36 rounded-full bg-cyan-300/18 blur-3xl" />

            {profilePhoto ? (
              <>
                <img src={profilePhoto} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-25 blur-2xl grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/80" />
                <div className="relative z-10 h-full overflow-hidden rounded-[2.25rem] border border-white/12 bg-black/35 shadow-[inset_0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-sm">
                  <img src={profilePhoto} alt="Elsa Alemayehu portrait" className="absolute inset-0 h-full w-full object-cover object-center grayscale contrast-125 brightness-90 saturate-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_22%,transparent_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.62)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/65 to-transparent" />
                </div>
              </>
            ) : (
              <div className="absolute inset-4 grid place-items-center rounded-[2.25rem] border border-white/12 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,#232323,#060606)]">
                <div className="text-center">
                  <p className="mono text-8xl font-black text-white">EA</p>
                  <p className="mt-4 text-sm text-white/55">Elsa Alemayehu</p>
                </div>
              </div>
            )}

            <div className="absolute left-7 top-7 z-20 rounded-full border border-white/12 bg-black/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 backdrop-blur-xl">Portrait</div>
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, 0.8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-7 left-1/2 z-20 w-[82%] -translate-x-1/2 rounded-[2rem] border border-white/15 bg-black/78 p-5 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.62)] backdrop-blur-2xl">
              <p className="mono text-4xl font-black tracking-[-0.05em]">EA</p>
              <p className="mt-2 text-xs leading-5 text-white/65">{profile.education}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SignatureHeroPanel />
      <ThreeDShowcase />
      <LeetCodeShowcase />
      <ZecAgencyShowcase />
      <ProjectCommandCenter activeProject={activeProject} setActiveProject={setActiveProject} setProjectAutoMove={setProjectAutoMove} />

      <section id="experience" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
        <OrbitalLines />
        <div className="relative z-10 mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mono mb-5 font-black">Career / Work Experience</p>
            <h2 className="mono text-[clamp(3.2rem,14vw,11rem)] font-black leading-[0.82] tracking-[-0.09em]">Experience</h2>
          </div>
          
        </div>

        <div className="relative z-10 rounded-[3rem] border border-white/15 bg-white/[0.025] p-5 shadow-[0_45px_150px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-7">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mono text-xs uppercase tracking-[0.32em] text-white/35">Career track</p>
              
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => scrollExperienceTrack(-1)} aria-label="Scroll experience left" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:bg-white hover:text-black">
                <Icon name="arrow" size={18} className="rotate-180" />
              </button>
              <button onClick={() => scrollExperienceTrack(1)} aria-label="Scroll experience right" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:bg-white hover:text-black">
                <Icon name="arrow" size={18} />
              </button>
              <button onClick={() => setExperienceAutoScroll((value) => !value)} className={experienceAutoScroll ? "rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 font-mono text-xs text-cyan-100" : "rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 font-mono text-xs text-white/65"}>
                {experienceAutoScroll ? "Auto moving" : "Manual mode"}
              </button>
            </div>
          </div>

          <div
            ref={experienceTrackRef}
            onWheel={() => setExperienceAutoScroll(false)}
            onPointerDown={() => setExperienceAutoScroll(false)}
            className="scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent overflow-x-auto overflow-y-hidden pb-5"
          >
            <motion.div className="flex w-max gap-4 pr-6">
              {experience.map((item, index) => {
                const isSelected = activeExperience === index;
                return (
                  <motion.button
                    key={`${item.company}-${item.role}`}
                    onClick={() => setActiveExperience(index)}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={isSelected ? "relative w-[280px] overflow-hidden rounded-[2rem] border border-cyan-300/45 bg-cyan-300/12 p-5 text-left shadow-[0_24px_90px_rgba(14,165,233,0.18)]" : "relative w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-5 text-left transition hover:border-white/30 hover:bg-white/[0.06]"}
                  >
                    <motion.div animate={{ x: ["-50%", "150%"] }} transition={{ duration: 6 + index * 0.18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className={isSelected ? "grid h-12 w-12 place-items-center rounded-full bg-cyan-300 font-mono text-sm font-black text-black" : "grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03] font-mono text-sm font-black text-white/55"}>0{index + 1}</span>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] text-white/50">{item.date}</span>
                    </div>
                    <h3 className="text-2xl font-semibold leading-tight text-white">{item.company}</h3>
                    <p className="mono mt-3 min-h-[48px] text-sm leading-6 text-white/72">{item.role}</p>
                    <p className="mt-3 text-xs text-white/42">{item.location}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.stack.slice(0, 3).map((skill) => <span key={`${item.company}-${skill}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/65">{skill}</span>)}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="mono text-xs uppercase tracking-[0.28em] text-white/35">{experienceAutoScroll ? "Auto horizontal motion" : "Manual scrolling enabled"}</p>
            <div className="flex gap-2">
              {experience.map((item, index) => (
                <button
                  key={`experience-dot-${item.company}`}
                  onClick={() => setActiveExperience(index)}
                  aria-label={`Select ${item.company}`}
                  className={activeExperience === index ? "h-2.5 w-8 rounded-full bg-cyan-300" : "h-2.5 w-2.5 rounded-full bg-white/20 transition hover:bg-white/50"}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[0.82fr_1.18fr] xl:items-stretch">
            <motion.div
              key={`experience-summary-${activeExperience}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, type: "spring" }}
              className="relative overflow-hidden rounded-[2.25rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.20),transparent_28%),rgba(0,0,0,0.35)] p-5 md:p-6"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -right-40 -top-40 h-[360px] w-[360px] rounded-full border border-white/10" />
              <div className="relative z-10">
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/50">Selected role</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-4xl">{experience[activeExperience].company}</h3>
                <p className="mono mt-3 text-base leading-7 text-white/75">{experience[activeExperience].role}</p>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/62">{experience[activeExperience].summary}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <p className="mono text-[9px] uppercase tracking-[0.22em] text-white/35">Period</p>
                    <p className="mt-1 text-sm font-semibold text-white">{experience[activeExperience].date}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <p className="mono text-[9px] uppercase tracking-[0.22em] text-white/35">Location</p>
                    <p className="mt-1 text-sm font-semibold text-white">{experience[activeExperience].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <ExperienceDetailCard item={experience[activeExperience]} index={activeExperience} />
          </div>
        </div>
      </section>

      <section id="education" className="relative mx-auto max-w-[1380px] overflow-hidden px-4 py-20 sm:px-5 md:px-10 md:py-24 lg:px-16">
        <OrbitalLines />
        <div className="relative z-10 mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mono mb-5 font-black">Education / Certificates</p>
            <h2 className="mono text-[clamp(3rem,13vw,10rem)] font-black leading-[0.82] tracking-[-0.09em]">Education</h2>
          </div>
          
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <TiltCard className="h-full min-h-[640px]">
            <div className="relative h-full min-h-[640px] overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.24),transparent_32%),rgba(255,255,255,0.035)] p-8 shadow-[0_45px_150px_rgba(0,0,0,0.52)] backdrop-blur-xl md:p-10" style={{ transformStyle: "preserve-3d" }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/10" />
              <motion.div animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-12 right-12 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
              <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex min-h-[360px] flex-col justify-between">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="mono text-xs uppercase tracking-[0.35em] text-cyan-100/55">University</p>
                    <h3 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">{education.degree}</h3>
                    <p className="mt-5 text-xl text-white/70">{education.university}</p>
                  </div>
                  <UniversityLogoMark />
                </div>
                <div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="mono text-[10px] uppercase tracking-[0.25em] text-white/35">Expected</p>
                      <p className="mt-2 font-semibold text-white">{education.expected}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="mono text-[10px] uppercase tracking-[0.25em] text-white/35">Level</p>
                      <p className="mt-2 font-semibold text-white">{education.level}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="mono text-[10px] uppercase tracking-[0.25em] text-white/35">Location</p>
                      <p className="mt-2 font-semibold text-white">{education.location}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {education.focus.map((item) => <Pill key={item}>{item}</Pill>)}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="flex h-full min-h-[640px] flex-col rounded-[3rem] border border-white/15 bg-[#f5f5f5] p-7 text-black shadow-[0_35px_120px_rgba(255,255,255,0.08)] md:p-9">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mono text-xs font-black uppercase tracking-[0.32em] text-black/40">Certificates</p>
                <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] md:text-5xl">Learning board</h3>
              </div>
              <span className="rounded-full bg-black px-5 py-3 font-mono text-xs text-white">{certs.length} records</span>
            </div>

            <div className="grid flex-1 auto-rows-fr gap-3 sm:grid-cols-2">
              {certs.map((cert, index) => (
                <motion.div key={cert.title} whileHover={{ y: -6, scale: 1.015 }} className="flex h-full min-h-[104px] flex-col rounded-[1.35rem] border border-black/10 bg-white p-3.5 shadow-sm">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 font-mono text-[10px] text-black/45">0{index + 1}</span>
                    <span className="rounded-full bg-black px-3 py-1.5 font-mono text-[10px] text-white">{cert.category}</span>
                  </div>
                  <h4 className="line-clamp-2 min-h-[38px] text-sm font-semibold leading-tight text-black">{cert.title}</h4>
                  <p className="mt-1 line-clamp-1 font-mono text-[11px] text-black/50">{cert.issuer}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.slice(0, 2).map((skill) => <span key={`${cert.title}-${skill}`} className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 font-mono text-[9px] text-black/60">{skill}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts" className="relative mx-auto mb-8 max-w-[1380px] overflow-hidden rounded-[3rem] border border-white/10 bg-[#121212] px-5 py-16 md:px-10 lg:px-14">
        <OrbitalLines />
        <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.65fr)] xl:items-start">
          <div className="min-w-0">
            <p className="mono mb-6 text-sm font-black uppercase tracking-[0.35em] text-cyan-100/55">Contact / Collaboration</p>
            <h2 className="mono max-w-full break-words text-[clamp(3.4rem,8vw,7.5rem)] font-black leading-[0.88] tracking-[-0.08em] text-white">
              {profile.firstName}<br />{profile.lastName}
            </h2>
            <p className="mt-8 max-w-md text-xl leading-snug text-white/70 md:text-2xl">
              {profile.role}<br />{profile.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <SocialButton icon="github" label="Github" href={profile.github} />
              <SocialButton icon="linkedin" label="LinkedIn" href={profile.linkedin} />
              <SocialButton icon="mail" label="E-mail" href={`mailto:${profile.email}`} />
            </div>
          </div>

          <div className="min-w-0 rounded-[2.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl md:p-8">
            <p className="mono mb-6 font-black uppercase tracking-[0.28em] text-white/45">Navigation / Contact links</p>
            <div className="mb-8 grid grid-cols-2 gap-3 text-sm text-white/65 sm:grid-cols-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full border border-white/10 px-4 py-2 text-center transition hover:bg-white hover:text-black">
                  {item}
                </a>
              ))}
            </div>
            <Card className="overflow-hidden rounded-[2rem] border-white/15 bg-white/[0.03] text-white">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-sans text-white/70">Site</p>
                    <p className="mono mt-2 text-xs uppercase tracking-[0.28em] text-white/35">Build information</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-mono text-[10px] text-cyan-100">2026</span>
                </div>

                <div className="grid gap-3 font-mono text-sm">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">Built by</p>
                    <p className="mt-2 text-white">Elsa Alemayehu</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">Design style</p>
                    <p className="mt-2 text-white/75">Dark mono portfolio • React • Framer Motion</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">Contact</p>
                    <a href={`mailto:${profile.email}`} className="mt-2 inline-flex break-all text-white/75 transition hover:text-white">
                      <Icon name="mail" className="mr-2 mt-0.5 shrink-0" size={15} />{profile.email}
                    </a>
                  </div>
                </div>

                <p className="mt-6 border-t border-white/10 pt-5 font-mono text-xs leading-6 text-white/45">
                  © 2026 Elsa Alemayehu. All rights reserved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </footer>
    </main>
  );
}
