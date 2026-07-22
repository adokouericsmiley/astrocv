// ============================================================
// lib/defaultData.ts — Données de démonstration initiales
// Pré-remplissent le CV pour que l'utilisateur voie immédiatement
// la mise en page avant de saisir ses propres données.
// ============================================================

import { CVData } from "./types";

export const defaultCVData: CVData = {
  personal: {
    firstName: "Sophie",
    lastName: "Martin",
    title: "Développeuse Full-Stack",
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78",
    address: "12 Rue de la Paix",
    city: "Paris",
    country: "France",
    linkedin: "linkedin.com/in/sophiemartin",
    github: "github.com/sophiemartin",
    website: "sophiemartin.dev",
    photoUrl: "",
    summary:
      "Développeuse Full-Stack passionnée avec 5 ans d'expérience dans la création d'applications web modernes. Spécialisée en React, Node.js et TypeScript. Je combine compétences techniques et sens du design pour livrer des produits de qualité.",
  },
  experiences: [
    {
      id: "exp-1",
      position: "Développeuse Full-Stack Senior",
      company: "TechCorp Paris",
      location: "Paris, France",
      startMonth: "03/2022",
      endMonth: "",
      current: true,
      description:
        "Lead technique d'une équipe de 4 développeurs. Architecture et développement d'une plateforme SaaS B2B.",
      bullets: [
        "Migration d'une architecture monolithique vers microservices (réduction de 40% du temps de déploiement)",
        "Mise en place de CI/CD avec GitHub Actions et Docker",
        "Mentorat de 2 développeurs juniors",
      ],
    },
    {
      id: "exp-2",
      position: "Développeuse React",
      company: "StartupXYZ",
      location: "Lyon, France",
      startMonth: "06/2020",
      endMonth: "02/2022",
      current: false,
      description:
        "Développement frontend d'une application de gestion de projet utilisée par 10 000+ utilisateurs.",
      bullets: [
        "Refonte complète de l'interface utilisateur avec React et TypeScript",
        "Amélioration des performances (score Lighthouse de 65 à 95)",
        "Intégration d'APIs REST et GraphQL",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master Informatique — Génie Logiciel",
      school: "Université Pierre et Marie Curie",
      location: "Paris, France",
      startMonth: "09/2017",
      endMonth: "06/2019",
      current: false,
      mention: "Mention Très Bien",
      description: "Spécialisation en architecture logicielle et systèmes distribués.",
    },
    {
      id: "edu-2",
      degree: "Licence Informatique",
      school: "Université de Lyon",
      location: "Lyon, France",
      startMonth: "09/2014",
      endMonth: "06/2017",
      current: false,
      mention: "Mention Bien",
      description: "",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js", level: 5, category: "Frontend" },
    { id: "sk-2", name: "TypeScript", level: 5, category: "Langages" },
    { id: "sk-3", name: "Node.js", level: 4, category: "Backend" },
    { id: "sk-4", name: "PostgreSQL", level: 4, category: "Bases de données" },
    { id: "sk-5", name: "Docker", level: 3, category: "DevOps" },
    { id: "sk-6", name: "GraphQL", level: 4, category: "Backend" },
    { id: "sk-7", name: "Tailwind CSS", level: 5, category: "Frontend" },
    { id: "sk-8", name: "Git / GitHub", level: 5, category: "Outils" },
  ],
  languages: [
    { id: "lang-1", name: "Français", level: "Natif" },
    { id: "lang-2", name: "Anglais", level: "C1" },
    { id: "lang-3", name: "Espagnol", level: "B1" },
  ],
  projects: [
    {
      id: "proj-1",
      title: "OpenBudget",
      description:
        "Application open-source de gestion budgétaire personnelle avec visualisations interactives.",
      technologies: ["React", "TypeScript", "Recharts", "Supabase"],
      link: "openbudget.app",
      github: "github.com/sophiemartin/openbudget",
    },
    {
      id: "proj-2",
      title: "DevBoard",
      description:
        "Dashboard de métriques de productivité pour développeurs, intégrant GitHub et Jira.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
      link: "",
      github: "github.com/sophiemartin/devboard",
    },
  ],
  interests: ["Photographie argentique", "Randonnée", "Open source", "Piano"],
  settings: {
    templateId: "creative",
    accentColor: "indigo",
    daisyTheme: "light",
    showPhoto: true,
    sectionOrder: [
      "experiences",
      "education",
      "skills",
      "languages",
      "projects",
      "interests",
    ],
  },
};
