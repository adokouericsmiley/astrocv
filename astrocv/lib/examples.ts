// ============================================================
// lib/examples.ts — Exemples de CV pour tous types de métiers
// Chaque exemple remplit le CV avec un contenu réaliste que
// l'utilisateur n'a plus qu'à adapter à sa situation.
// ============================================================

import {
  CVData,
  Education,
  Experience,
  Language,
  LanguageLevel,
  PersonalInfo,
  Project,
  SectionKey,
  Skill,
  SkillLevel,
} from "./types";

export type ExampleContent = Omit<CVData, "settings">;

export interface ExampleProfile {
  id: string;
  job: string;       // Métier affiché dans la galerie
  sector: string;    // Secteur d'activité
  sectionOrder?: SectionKey[];
  content: ExampleContent;
}

// ── Constructeurs (évitent la répétition) ────────────────────
let n = 0;
const uid = (prefix: string) => `${prefix}-${++n}`;

const person = (p: Partial<PersonalInfo>): PersonalInfo => ({
  firstName: "", lastName: "", title: "", email: "", phone: "",
  address: "", city: "", country: "France", linkedin: "", github: "",
  website: "", photoUrl: "", summary: "",
  ...p,
});

const exp = (
  position: string, company: string, location: string,
  start: string, end: string, description: string, bullets: string[]
): Experience => ({
  id: uid("exp"), position, company, location,
  startMonth: start, endMonth: end, current: end === "", description, bullets,
});

const edu = (
  degree: string, school: string, location: string,
  start: string, end: string, mention = "", description = ""
): Education => ({
  id: uid("edu"), degree, school, location,
  startMonth: start, endMonth: end, current: false, mention, description,
});

const sk = (name: string, level: SkillLevel, category: string): Skill => ({
  id: uid("sk"), name, level, category,
});

const lang = (name: string, level: LanguageLevel): Language => ({
  id: uid("lang"), name, level,
});

const proj = (
  title: string, description: string, technologies: string[] = [], link = ""
): Project => ({
  id: uid("proj"), title, description, technologies, link, github: "",
});

// ── Exemples ─────────────────────────────────────────────────
export const EXAMPLE_PROFILES: ExampleProfile[] = [
  {
    id: "commercial",
    job: "Responsable commercial",
    sector: "Vente & Commerce",
    content: {
      personal: person({
        firstName: "Camille", lastName: "Durand",
        title: "Responsable commercial B2B",
        email: "camille.durand@email.com", phone: "+33 6 12 34 56 78",
        city: "Lyon", linkedin: "linkedin.com/in/camilledurand",
        summary:
          "Commerciale orientée résultats avec 8 ans d'expérience en vente de solutions B2B. Spécialiste de la prospection, de la négociation grands comptes et du management d'équipes de 6 à 10 personnes. Objectif : développer un portefeuille clients durable.",
      }),
      experiences: [
        exp("Responsable commerciale Grands Comptes", "Groupe Alpha Industries", "Lyon", "01/2021", "",
          "Pilotage d'une équipe de 8 commerciaux sur la région Auvergne-Rhône-Alpes.",
          ["Chiffre d'affaires porté de 3,2 M€ à 4,9 M€ en 3 ans (+53 %)",
           "Signature de 12 comptes stratégiques supérieurs à 100 k€ par an",
           "Mise en place d'un suivi hebdomadaire du pipeline (taux de transformation +18 %)"]),
        exp("Chargée d'affaires", "Solutions Pro", "Villeurbanne", "09/2017", "12/2020",
          "Développement d'un portefeuille de 60 clients PME.",
          ["Dépassement des objectifs annuels 3 années sur 3 (de 105 % à 128 %)",
           "Fidélisation : 94 % de taux de renouvellement des contrats"]),
      ],
      education: [
        edu("Master Management Commercial", "EM Lyon Business School", "Lyon", "09/2014", "06/2016", "Mention Bien"),
        edu("BTS Négociation et Digitalisation de la Relation Client", "Lycée Édouard Branly", "Lyon", "09/2012", "06/2014"),
      ],
      skills: [
        sk("Prospection et négociation", 5, "Vente"), sk("Gestion de grands comptes", 5, "Vente"),
        sk("Management d'équipe", 4, "Management"), sk("Salesforce CRM", 4, "Outils"),
        sk("Pack Office / Excel avancé", 4, "Outils"), sk("Reporting commercial", 4, "Pilotage"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "C1"), lang("Allemand", "B1")],
      projects: [],
      interests: ["Course à pied", "Bénévolat (Restos du Cœur)", "Voyages"],
    },
  },
  {
    id: "infirmiere",
    job: "Infirmier / Infirmière",
    sector: "Santé",
    content: {
      personal: person({
        firstName: "Léa", lastName: "Bernard",
        title: "Infirmière diplômée d'État",
        email: "lea.bernard@email.com", phone: "+33 6 45 67 89 01", city: "Nantes",
        summary:
          "Infirmière DE avec 6 ans d'expérience en médecine et en urgences. Rigoureuse, à l'écoute des patients et habituée à travailler en équipe pluridisciplinaire dans des situations d'urgence. Recherche un poste en service de réanimation.",
      }),
      experiences: [
        exp("Infirmière aux urgences", "CHU de Nantes", "Nantes", "09/2020", "",
          "Accueil et prise en charge de 80 à 120 patients par jour dans un service de niveau 1.",
          ["Tri et évaluation de l'urgence des patients (IOA)",
           "Réalisation des soins techniques : perfusions, ECG, pansements complexes",
           "Encadrement de 4 étudiants en soins infirmiers par an"]),
        exp("Infirmière en médecine interne", "Clinique Saint-Joseph", "Angers", "10/2018", "08/2020",
          "Suivi de 24 lits en service de médecine polyvalente.",
          ["Administration des traitements et surveillance des constantes",
           "Coordination avec les médecins, kinésithérapeutes et aides-soignants"]),
      ],
      education: [
        edu("Diplôme d'État d'Infirmier", "IFSI du CHU d'Angers", "Angers", "09/2015", "07/2018"),
        edu("Attestation de formation aux gestes et soins d'urgence (AFGSU 2)", "CESU 44", "Nantes", "2021", "2021"),
      ],
      skills: [
        sk("Soins techniques et urgences", 5, "Clinique"), sk("Gestion du stress", 5, "Clinique"),
        sk("Éducation thérapeutique", 4, "Clinique"), sk("Transmissions et dossier patient", 5, "Organisation"),
        sk("Logiciel DxCare", 4, "Outils"), sk("Hygiène et prévention des infections", 5, "Clinique"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B2")],
      projects: [],
      interests: ["Yoga", "Randonnée", "Bénévolat à la Croix-Rouge"],
    },
  },
  {
    id: "comptable",
    job: "Comptable / Gestionnaire",
    sector: "Finance & Comptabilité",
    content: {
      personal: person({
        firstName: "Antoine", lastName: "Lefèvre",
        title: "Comptable général",
        email: "antoine.lefevre@email.com", phone: "+33 6 23 45 67 89", city: "Lille",
        linkedin: "linkedin.com/in/antoinelefevre",
        summary:
          "Comptable général avec 7 ans d'expérience en cabinet et en entreprise. Maîtrise de la tenue comptable jusqu'au bilan, de la TVA et de la clôture mensuelle. Méthodique, fiable et habitué aux délais serrés.",
      }),
      experiences: [
        exp("Comptable général", "Groupe Nord Distribution", "Lille", "03/2019", "",
          "Tenue de la comptabilité de 3 sociétés (CA cumulé de 22 M€).",
          ["Clôture mensuelle réalisée en J+5 au lieu de J+10",
           "Établissement des déclarations de TVA, de la liasse fiscale et du bilan",
           "Rapprochements bancaires et suivi des comptes clients (retards de paiement réduits de 30 %)"]),
        exp("Collaborateur comptable", "Cabinet Dubois & Associés", "Lille", "09/2016", "02/2019",
          "Gestion d'un portefeuille de 45 dossiers TPE/PME.",
          ["Saisie, révision et déclarations sociales et fiscales",
           "Conseil aux dirigeants sur la gestion de trésorerie"]),
      ],
      education: [
        edu("DSCG — Diplôme supérieur de comptabilité et gestion", "INTEC Paris", "Paris", "09/2018", "06/2020"),
        edu("DCG — Diplôme de comptabilité et gestion", "Lycée Gaston Berger", "Lille", "09/2013", "06/2016"),
      ],
      skills: [
        sk("Comptabilité générale et analytique", 5, "Comptabilité"), sk("TVA et fiscalité d'entreprise", 4, "Fiscalité"),
        sk("Clôture et bilan", 5, "Comptabilité"), sk("Sage 100 / Cegid", 5, "Logiciels"),
        sk("Excel avancé (TCD, macros)", 4, "Logiciels"), sk("Contrôle de gestion", 3, "Gestion"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B2")],
      projects: [],
      interests: ["Échecs", "Football amateur", "Lecture économique"],
    },
  },
  {
    id: "enseignant",
    job: "Enseignant / Formateur",
    sector: "Éducation & Formation",
    content: {
      personal: person({
        firstName: "Sarah", lastName: "Moreau",
        title: "Professeure des écoles",
        email: "sarah.moreau@email.com", phone: "+33 6 78 90 12 34", city: "Toulouse",
        summary:
          "Professeure des écoles avec 9 ans d'expérience en cycles 2 et 3. Pédagogie différenciée, projets interdisciplinaires et usage raisonné du numérique. Attachée à la réussite et au bien-être de chaque élève.",
      }),
      experiences: [
        exp("Professeure des écoles — CM1/CM2", "École élémentaire Jean Jaurès", "Toulouse", "09/2018", "",
          "Classe de 26 élèves, responsable du projet d'école « Lire et écrire ensemble ».",
          ["Taux de réussite aux évaluations nationales supérieur de 8 points à la moyenne académique",
           "Mise en place d'ateliers de lecture en petits groupes pour les élèves en difficulté",
           "Coordination d'une classe de découverte de 5 jours (24 élèves)"]),
        exp("Professeure des écoles — CP", "École Les Chênes", "Blagnac", "09/2015", "06/2018",
          "Enseignement de la lecture et du calcul à des classes de 22 élèves.",
          ["Collaboration étroite avec les familles (réunions trimestrielles)",
           "Utilisation de tablettes pour l'apprentissage de la lecture"]),
      ],
      education: [
        edu("Master MEEF — Métiers de l'enseignement, 1er degré", "INSPÉ de Toulouse", "Toulouse", "09/2013", "06/2015", "Mention Bien"),
        edu("Licence de Lettres modernes", "Université Toulouse Jean Jaurès", "Toulouse", "09/2010", "06/2013"),
      ],
      skills: [
        sk("Pédagogie différenciée", 5, "Pédagogie"), sk("Gestion de classe", 5, "Pédagogie"),
        sk("Conception de séquences", 5, "Pédagogie"), sk("Outils numériques (TNI, ENT)", 4, "Numérique"),
        sk("Travail avec les familles", 4, "Relationnel"), sk("Accompagnement des élèves à besoins particuliers", 4, "Pédagogie"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B2"), lang("Espagnol", "B1")],
      projects: [],
      interests: ["Théâtre", "Jardinage", "Lecture jeunesse"],
    },
  },
  {
    id: "cuisinier",
    job: "Chef de cuisine / Restauration",
    sector: "Hôtellerie & Restauration",
    content: {
      personal: person({
        firstName: "Mehdi", lastName: "Benali",
        title: "Chef de cuisine",
        email: "mehdi.benali@email.com", phone: "+33 6 34 56 78 90", city: "Bordeaux",
        summary:
          "Chef de cuisine avec 12 ans d'expérience en restauration gastronomique et brasserie. Gestion de brigade, maîtrise des coûts matières et respect strict des normes HACCP. Passionné de cuisine de produits locaux et de saison.",
      }),
      experiences: [
        exp("Chef de cuisine", "Brasserie Le Quai", "Bordeaux", "05/2019", "",
          "Direction d'une brigade de 9 personnes pour 180 couverts par service.",
          ["Ratio coûts matières ramené de 34 % à 29 %",
           "Création de la carte de saison avec 80 % de producteurs locaux",
           "Zéro non-conformité lors des deux derniers contrôles d'hygiène"]),
        exp("Second de cuisine", "Hôtel Les Vignes ★★★★", "Saint-Émilion", "03/2014", "04/2019",
          "Supervision de la production et des commandes pour le restaurant gastronomique.",
          ["Gestion des stocks et des commandes fournisseurs",
           "Formation et suivi de 6 apprentis"]),
      ],
      education: [
        edu("Mention complémentaire Cuisinier en desserts de restaurant", "CFA de la Chambre de métiers", "Bordeaux", "09/2011", "06/2012"),
        edu("CAP Cuisine", "Lycée hôtelier de Talence", "Talence", "09/2009", "06/2011"),
      ],
      skills: [
        sk("Cuisine gastronomique et de brasserie", 5, "Cuisine"), sk("Normes HACCP", 5, "Hygiène"),
        sk("Gestion de brigade", 5, "Management"), sk("Gestion des coûts matières", 4, "Gestion"),
        sk("Création de cartes", 4, "Cuisine"), sk("Gestion des stocks", 4, "Gestion"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B1"), lang("Arabe", "C1")],
      projects: [],
      interests: ["Marchés de producteurs", "Football", "Œnologie"],
    },
  },
  {
    id: "electricien",
    job: "Électricien / Artisan du bâtiment",
    sector: "BTP & Métiers manuels",
    content: {
      personal: person({
        firstName: "Julien", lastName: "Roux",
        title: "Électricien du bâtiment",
        email: "julien.roux@email.com", phone: "+33 6 56 78 90 12", city: "Marseille",
        summary:
          "Électricien qualifié avec 10 ans d'expérience en installation et dépannage, en logement neuf et en rénovation. Habilité B2V-BR, sérieux, autonome et attentif à la sécurité sur les chantiers. Titulaire du permis B.",
      }),
      experiences: [
        exp("Électricien N3P2", "Sud Électricité Services", "Marseille", "02/2018", "",
          "Installation et mise en conformité électrique de logements et de locaux professionnels.",
          ["Pose de tableaux, câblage, éclairage et domotique sur plus de 150 chantiers",
           "Diagnostic et dépannage sur site sous 24 h",
           "Encadrement d'un apprenti et lecture des plans d'exécution"]),
        exp("Électricien", "Provence Rénovation", "Aubagne", "09/2014", "01/2018",
          "Rénovation électrique d'appartements et de maisons individuelles.",
          ["Mise aux normes NF C 15-100",
           "Respect des délais : 98 % des chantiers livrés à la date prévue"]),
      ],
      education: [
        edu("Bac Pro Métiers de l'électricité et de ses environnements connectés", "Lycée Professionnel Diderot", "Marseille", "09/2011", "06/2014"),
        edu("Habilitation électrique B2V-BR-H0V", "AFPA", "Marseille", "2022", "2022"),
      ],
      skills: [
        sk("Installation électrique (NF C 15-100)", 5, "Technique"), sk("Dépannage et diagnostic", 5, "Technique"),
        sk("Domotique et courants faibles", 4, "Technique"), sk("Lecture de plans", 4, "Technique"),
        sk("Sécurité sur chantier", 5, "Sécurité"), sk("Relation client", 4, "Relationnel"),
      ],
      languages: [lang("Français", "Natif"), lang("Italien", "B1")],
      projects: [],
      interests: ["Pêche", "Bricolage", "Football"],
    },
  },
  {
    id: "marketing",
    job: "Chargé de marketing digital",
    sector: "Marketing & Communication",
    content: {
      personal: person({
        firstName: "Inès", lastName: "Garnier",
        title: "Chargée de marketing digital",
        email: "ines.garnier@email.com", phone: "+33 6 67 89 01 23", city: "Paris",
        linkedin: "linkedin.com/in/inesgarnier", website: "inesgarnier.com",
        summary:
          "Chargée de marketing digital avec 5 ans d'expérience en acquisition, contenu et réseaux sociaux pour des marques B2C. Axée sur la performance mesurable : SEO, campagnes payantes, emailing et analyse de données.",
      }),
      experiences: [
        exp("Chargée de marketing digital", "Maison Éclat (cosmétiques)", "Paris", "10/2021", "",
          "Pilotage de l'acquisition et de la communication digitale d'une marque DNVB.",
          ["Trafic organique multiplié par 2,4 en 18 mois grâce à la stratégie SEO et éditoriale",
           "Gestion d'un budget publicitaire de 15 k€/mois (ROAS moyen de 4,2)",
           "Création de la newsletter : 38 % de taux d'ouverture"]),
        exp("Community manager", "Agence Pixel & Co", "Paris", "09/2019", "09/2021",
          "Animation des réseaux sociaux de 8 clients (mode, restauration, tourisme).",
          ["Croissance de +120 % de la communauté Instagram d'un client en un an",
           "Reporting mensuel et recommandations stratégiques"]),
      ],
      education: [
        edu("Master Communication et Marketing digital", "CELSA Sorbonne Université", "Paris", "09/2017", "06/2019", "Mention Bien"),
        edu("Licence Information-Communication", "Université Rennes 2", "Rennes", "09/2014", "06/2017"),
      ],
      skills: [
        sk("SEO / SEA", 5, "Acquisition"), sk("Google Analytics 4", 4, "Analyse"),
        sk("Emailing (Klaviyo, Mailchimp)", 4, "CRM"), sk("Réseaux sociaux", 5, "Social media"),
        sk("Rédaction web", 5, "Contenu"), sk("Canva / Suite Adobe", 3, "Création"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "C1")],
      projects: [
        proj("Blog « Beauté responsable »", "Média indépendant de 25 000 visiteurs mensuels, entièrement géré (rédaction, SEO, partenariats).", ["SEO", "WordPress"], "beauteresponsable.fr"),
      ],
      interests: ["Photographie", "Podcasts", "Cuisine végétale"],
    },
  },
  {
    id: "rh_assistant",
    job: "Assistant(e) administratif / RH",
    sector: "Administration & Ressources humaines",
    content: {
      personal: person({
        firstName: "Nadia", lastName: "Haddad",
        title: "Assistante administrative et RH",
        email: "nadia.haddad@email.com", phone: "+33 6 89 01 23 45", city: "Strasbourg",
        summary:
          "Assistante administrative et RH avec 6 ans d'expérience en PME. Organisée, discrète et polyvalente : gestion des dossiers du personnel, paie, recrutement et accueil. À l'aise avec les outils bureautiques et les logiciels RH.",
      }),
      experiences: [
        exp("Assistante RH et administrative", "Groupe Rhénan Logistique", "Strasbourg", "01/2020", "",
          "Support à la direction et gestion administrative pour 120 salariés.",
          ["Préparation des variables de paie et suivi des absences",
           "Organisation du recrutement : rédaction d'annonces, tri des CV, entretiens téléphoniques",
           "Réduction de 25 % du délai d'intégration grâce à un livret d'accueil structuré"]),
        exp("Assistante administrative", "Cabinet Weber Immobilier", "Strasbourg", "09/2017", "12/2019",
          "Accueil, gestion du courrier, des agendas et facturation.",
          ["Gestion de l'agenda de 4 négociateurs",
           "Suivi des dossiers de location et de vente"]),
      ],
      education: [
        edu("Licence professionnelle Gestion des ressources humaines", "Université de Strasbourg", "Strasbourg", "09/2016", "06/2017"),
        edu("BTS Support à l'action managériale", "Lycée Marie Curie", "Strasbourg", "09/2014", "06/2016"),
      ],
      skills: [
        sk("Administration du personnel", 5, "RH"), sk("Préparation de la paie", 4, "RH"),
        sk("Recrutement", 4, "RH"), sk("Pack Office (Word, Excel, Outlook)", 5, "Bureautique"),
        sk("SIRH (Lucca, PayFit)", 4, "Logiciels"), sk("Organisation et rigueur", 5, "Savoir-être"),
      ],
      languages: [lang("Français", "Natif"), lang("Allemand", "B2"), lang("Anglais", "B1")],
      projects: [],
      interests: ["Lecture", "Danse", "Bénévolat associatif"],
    },
  },
  {
    id: "logisticien",
    job: "Logisticien / Cariste / Livreur",
    sector: "Logistique & Transport",
    content: {
      personal: person({
        firstName: "Karim", lastName: "Petit",
        title: "Agent logistique — cariste CACES 1-3-5",
        email: "karim.petit@email.com", phone: "+33 6 90 12 34 56", city: "Le Havre",
        summary:
          "Agent logistique avec 8 ans d'expérience en entrepôt (réception, préparation de commandes, expédition). Titulaire des CACES 1, 3 et 5, rapide, fiable et soucieux de la sécurité. Disponible immédiatement, permis B et véhicule.",
      }),
      experiences: [
        exp("Cariste / Préparateur de commandes", "Entrepôts Normandie Logistique", "Le Havre", "04/2018", "",
          "Réception, stockage et préparation de 300 commandes par jour sur plateforme de 12 000 m².",
          ["Taux d'erreur de préparation inférieur à 0,3 %",
           "Conduite de chariots frontaux et de gerbeurs en sécurité",
           "Tutorat de 5 nouveaux intérimaires"]),
        exp("Agent de quai", "TransPorts Atlantique", "Rouen", "02/2015", "03/2018",
          "Chargement et déchargement de camions, contrôle des marchandises.",
          ["Saisie des mouvements de stock sur WMS",
           "Respect des délais de départ des tournées"]),
      ],
      education: [
        edu("CACES R489 catégories 1, 3 et 5", "AFTRAL", "Le Havre", "2017", "2017"),
        edu("CAP Opérateur/Opératrice logistique", "Lycée Professionnel Jules Siegfried", "Le Havre", "09/2012", "06/2014"),
      ],
      skills: [
        sk("Conduite de chariots (CACES 1-3-5)", 5, "Manutention"), sk("Préparation de commandes", 5, "Logistique"),
        sk("Gestion des stocks (WMS)", 4, "Logistique"), sk("Sécurité et gestes et postures", 5, "Sécurité"),
        sk("Lecture de documents de transport", 4, "Logistique"), sk("Travail en équipe", 5, "Savoir-être"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "A2")],
      projects: [],
      interests: ["Football", "Mécanique", "Pêche en mer"],
    },
  },
  {
    id: "juriste",
    job: "Juriste / Avocat",
    sector: "Droit & Conseil",
    content: {
      personal: person({
        firstName: "Élise", lastName: "Fontaine",
        title: "Juriste en droit des affaires",
        email: "elise.fontaine@email.com", phone: "+33 6 12 98 76 54", city: "Paris",
        linkedin: "linkedin.com/in/elisefontaine",
        summary:
          "Juriste en droit des affaires avec 6 ans d'expérience en cabinet et en direction juridique. Rédaction et négociation de contrats commerciaux, conformité RGPD, gestion de contentieux. Rigoureuse, synthétique et force de proposition.",
      }),
      experiences: [
        exp("Juriste contrats et conformité", "Groupe Meridian (CAC 40)", "La Défense", "11/2020", "",
          "Support juridique des équipes commerciales et achats sur 12 pays.",
          ["Rédaction et négociation de plus de 200 contrats par an",
           "Déploiement du programme de conformité RGPD",
           "Gestion de 15 contentieux commerciaux en lien avec les avocats externes"]),
        exp("Collaboratrice juridique", "Cabinet Lambert Avocats", "Paris", "09/2018", "10/2020",
          "Conseil aux PME en droit commercial et droit des sociétés.",
          ["Assistance aux opérations de fusion et d'acquisition (due diligence)",
           "Rédaction de pactes d'associés et de statuts"]),
      ],
      education: [
        edu("Master 2 Droit des affaires", "Université Paris 1 Panthéon-Sorbonne", "Paris", "09/2016", "06/2018", "Mention Très Bien"),
        edu("Certificat d'aptitude à la profession d'avocat (CAPA)", "École de formation du Barreau de Paris", "Paris", "2018", "2019"),
      ],
      skills: [
        sk("Rédaction et négociation de contrats", 5, "Droit"), sk("Droit des sociétés", 4, "Droit"),
        sk("RGPD et conformité", 4, "Droit"), sk("Gestion de contentieux", 4, "Droit"),
        sk("Veille juridique", 5, "Méthodes"), sk("Synthèse et analyse", 5, "Méthodes"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "C2"), lang("Espagnol", "B2")],
      projects: [],
      interests: ["Piano", "Course à pied", "Cinéma"],
    },
  },
  {
    id: "designer",
    job: "Designer graphique",
    sector: "Création & Design",
    content: {
      personal: person({
        firstName: "Lucas", lastName: "Mercier",
        title: "Designer graphique & UI",
        email: "lucas.mercier@email.com", phone: "+33 6 21 43 65 87", city: "Nantes",
        website: "lucasmercier.design",
        summary:
          "Designer graphique avec 6 ans d'expérience en identité visuelle, supports print et interfaces web. Capable de traduire un besoin en concept clair, de la recherche à la livraison des fichiers. Collaboratif et sensible aux enjeux de marque.",
      }),
      experiences: [
        exp("Designer graphique", "Studio Orange Bleue", "Nantes", "01/2021", "",
          "Création d'identités de marque et de supports de communication pour 30 clients.",
          ["Refonte complète de l'identité de 12 marques (logo, charte, packaging)",
           "Conception de maquettes d'interfaces dans Figma pour 6 sites web",
           "Gestion simultanée de 8 projets avec respect des délais"]),
        exp("Infographiste", "Imprimerie Centrale", "Rezé", "09/2018", "12/2020",
          "Préparation de fichiers pour l'impression et création de brochures.",
          ["Mise en page de catalogues, flyers et affiches",
           "Contrôle de la qualité des fichiers avant impression"]),
      ],
      education: [
        edu("Bachelor Design graphique et motion", "École de design Nantes Atlantique", "Nantes", "09/2015", "06/2018"),
      ],
      skills: [
        sk("Identité visuelle", 5, "Design"), sk("Mise en page / Print", 5, "Design"),
        sk("Adobe Illustrator / Photoshop / InDesign", 5, "Logiciels"), sk("Figma", 4, "Logiciels"),
        sk("Motion design (After Effects)", 3, "Logiciels"), sk("Direction artistique", 4, "Design"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B2")],
      projects: [
        proj("Identité « Brasserie des Marais »", "Création complète d'une marque de bières artisanales : logo, étiquettes, site vitrine.", ["Branding", "Packaging"], "lucasmercier.design/marais"),
      ],
      interests: ["Illustration", "Sérigraphie", "Skateboard"],
    },
  },
  {
    id: "vendeur",
    job: "Conseiller de vente / Commerce",
    sector: "Commerce de détail",
    content: {
      personal: person({
        firstName: "Chloé", lastName: "Simon",
        title: "Conseillère de vente",
        email: "chloe.simon@email.com", phone: "+33 6 32 54 76 98", city: "Rennes",
        summary:
          "Conseillère de vente dynamique avec 4 ans d'expérience en boutique de prêt-à-porter. Sens du contact, goût du challenge et excellente connaissance du merchandising. Objectif : évoluer vers un poste de responsable de boutique.",
      }),
      experiences: [
        exp("Conseillère de vente", "Maison Lumière (prêt-à-porter)", "Rennes", "03/2022", "",
          "Accueil, conseil et fidélisation d'une clientèle de 150 visiteurs par jour.",
          ["Objectifs de vente atteints à 112 % sur les 4 derniers trimestres",
           "Développement du fichier clients (+400 inscrits à la carte de fidélité)",
           "Gestion de la caisse et de l'inventaire mensuel"]),
        exp("Vendeuse polyvalente", "Sport Avenue", "Rennes", "06/2020", "02/2022",
          "Vente et conseil sur les rayons textile et chaussures.",
          ["Mise en rayon et merchandising selon les directives de l'enseigne",
           "Élue vendeuse du mois à 3 reprises"]),
      ],
      education: [
        edu("BTS Management commercial opérationnel", "Lycée Jean Macé", "Rennes", "09/2018", "06/2020"),
        edu("Baccalauréat professionnel Métiers du commerce et de la vente", "Lycée Jean Jaurès", "Rennes", "09/2015", "06/2018"),
      ],
      skills: [
        sk("Conseil et vente additionnelle", 5, "Vente"), sk("Accueil et fidélisation clients", 5, "Vente"),
        sk("Merchandising", 4, "Commerce"), sk("Encaissement et inventaire", 4, "Commerce"),
        sk("Gestion des réclamations", 4, "Relationnel"), sk("Travail en équipe", 5, "Savoir-être"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "B2")],
      projects: [],
      interests: ["Mode et stylisme", "Danse", "Voyages"],
    },
  },
  {
    id: "etudiant",
    job: "Étudiant / Premier emploi",
    sector: "Jeune diplômé",
    sectionOrder: ["education", "experiences", "skills", "languages", "projects", "interests"],
    content: {
      personal: person({
        firstName: "Hugo", lastName: "Lambert",
        title: "Étudiant en Master — recherche stage de fin d'études",
        email: "hugo.lambert@email.com", phone: "+33 6 43 65 87 09", city: "Montpellier",
        linkedin: "linkedin.com/in/hugolambert",
        summary:
          "Étudiant en Master 2 Gestion avec une première expérience en stage et en jobs étudiants. Motivé, curieux et sérieux, à la recherche d'un stage de 6 mois à partir de mars pour mettre en pratique mes acquis et progresser.",
      }),
      experiences: [
        exp("Stagiaire — Assistant contrôle de gestion", "Société Méditerranée Énergie", "Montpellier", "06/2024", "08/2024",
          "Appui à l'équipe finance pour le suivi budgétaire.",
          ["Création d'un tableau de bord mensuel des écarts budgétaires sous Excel",
           "Analyse de 3 années de données pour préparer le budget N+1"]),
        exp("Employé polyvalent (job étudiant)", "Supermarché Casino", "Montpellier", "09/2022", "06/2024",
          "Mise en rayon et caisse à temps partiel (week-ends et vacances).",
          ["Conciliation des études et de 12 h de travail hebdomadaires",
           "Accueil et service client"]),
      ],
      education: [
        edu("Master 2 Gestion — parcours Finance", "Université de Montpellier", "Montpellier", "09/2024", "06/2026"),
        edu("Licence Économie-Gestion", "Université de Montpellier", "Montpellier", "09/2021", "06/2024", "Mention Assez Bien"),
        edu("Baccalauréat ES", "Lycée Joffre", "Montpellier", "09/2018", "06/2021", "Mention Bien"),
      ],
      skills: [
        sk("Excel (TCD, formules avancées)", 4, "Outils"), sk("Analyse financière", 3, "Gestion"),
        sk("Pack Office", 5, "Outils"), sk("Esprit d'analyse et de synthèse", 4, "Savoir-être"),
        sk("Travail en équipe", 4, "Savoir-être"), sk("Prise de parole en public", 3, "Savoir-être"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "C1"), lang("Espagnol", "B1")],
      projects: [
        proj("Étude de cas : valorisation d'une PME", "Projet universitaire en groupe de 4 : évaluation d'une entreprise et présentation devant un jury.", ["Excel", "Finance d'entreprise"]),
      ],
      interests: ["Basket (club universitaire)", "Association étudiante (trésorier)", "Lecture"],
    },
  },
  {
    id: "developpeur",
    job: "Développeur / Informatique",
    sector: "Tech & Numérique",
    content: {
      personal: person({
        firstName: "Sophie", lastName: "Martin",
        title: "Développeuse Full-Stack",
        email: "sophie.martin@email.com", phone: "+33 6 12 34 56 78", city: "Paris",
        github: "github.com/sophiemartin", website: "sophiemartin.dev",
        summary:
          "Développeuse Full-Stack avec 5 ans d'expérience dans la création d'applications web. Spécialisée en React, Node.js et TypeScript. Je combine compétences techniques et sens du produit pour livrer des solutions fiables.",
      }),
      experiences: [
        exp("Développeuse Full-Stack Senior", "TechCorp Paris", "Paris", "03/2022", "",
          "Lead technique d'une équipe de 4 développeurs sur une plateforme SaaS B2B.",
          ["Migration vers une architecture microservices (déploiements 40 % plus rapides)",
           "Mise en place de la CI/CD avec GitHub Actions et Docker",
           "Mentorat de 2 développeurs juniors"]),
        exp("Développeuse React", "StartupXYZ", "Lyon", "06/2020", "02/2022",
          "Développement front-end d'une application de gestion de projet (10 000 utilisateurs).",
          ["Refonte de l'interface en React et TypeScript",
           "Score Lighthouse porté de 65 à 95"]),
      ],
      education: [
        edu("Master Informatique — Génie Logiciel", "Sorbonne Université", "Paris", "09/2017", "06/2019", "Mention Très Bien"),
        edu("Licence Informatique", "Université de Lyon", "Lyon", "09/2014", "06/2017", "Mention Bien"),
      ],
      skills: [
        sk("React / Next.js", 5, "Frontend"), sk("TypeScript", 5, "Langages"),
        sk("Node.js", 4, "Backend"), sk("PostgreSQL", 4, "Bases de données"),
        sk("Docker", 3, "DevOps"), sk("Git / GitHub", 5, "Outils"),
      ],
      languages: [lang("Français", "Natif"), lang("Anglais", "C1")],
      projects: [
        proj("OpenBudget", "Application open source de gestion budgétaire avec visualisations interactives.", ["React", "TypeScript", "Supabase"], "openbudget.app"),
      ],
      interests: ["Photographie", "Randonnée", "Open source"],
    },
  },
];
