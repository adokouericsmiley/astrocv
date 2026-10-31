// ============================================================
// app/page.tsx — Landing page AstroCV
// Server Component : seuls les aperçus de modèles (components/landing/*)
// sont rendus côté client. L'éditeur vit sur /editor.
// ============================================================

import Link from "next/link";
import {
  ArrowRight, BookUser, Check, ChevronDown, FileDown, Files, LayoutTemplate,
  Lock, ShieldCheck, SlidersHorizontal,
} from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/ui/Logo";
import HeroVisual from "@/components/landing/HeroVisual";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import AtsCompare from "@/components/landing/AtsCompare";
import { EXAMPLE_PROFILES } from "@/lib/examples";
import { TEMPLATES } from "@/components/templates";

const FEATURES = [
  {
    icon: ShieldCheck, title: "Modèles compatibles ATS",
    text: "Des mises en page en une colonne, sans icône ni photo, lues sans erreur par les logiciels de tri de candidatures.",
  },
  {
    icon: LayoutTemplate, title: `${TEMPLATES.length} modèles pour tous les goûts`,
    text: "Classiques, modernes ou créatifs : changez de modèle en un clic, vos informations restent en place.",
  },
  {
    icon: BookUser, title: "Des exemples pour chaque métier",
    text: "Infirmier, comptable, cuisinier, électricien, commercial, enseignant… Partez d'un contenu réaliste et adaptez-le.",
  },
  {
    icon: SlidersHorizontal, title: "Personnalisation complète",
    text: "Couleur libre, polices, taille du texte, espacements, ordre et visibilité des sections.",
  },
  {
    icon: Files, title: "Une ou plusieurs pages",
    text: "La mise en page remplit la page, passe sur une 2e page si besoin, et vous montre les sauts de page.",
  },
  {
    icon: Lock, title: "Vos données restent chez vous",
    text: "Pas de compte à créer : votre CV est enregistré dans votre navigateur. Export PDF A4 en un clic.",
  },
];

const STEPS = [
  { n: "1", title: "Choisissez un modèle", text: "Parcourez les modèles ATS, classiques, modernes ou créatifs, avec un aperçu de votre propre CV." },
  { n: "2", title: "Remplissez ou partez d'un exemple", text: "Saisissez vos informations ou chargez l'exemple de votre métier. L'aperçu se met à jour en direct." },
  { n: "3", title: "Personnalisez et exportez", text: "Réglez couleurs, police et sections, puis téléchargez un PDF net, prêt à envoyer." },
];

const FAQ = [
  {
    q: "Qu'est-ce qu'un CV compatible ATS ?",
    a: "Les ATS (Applicant Tracking Systems) sont des logiciels que de nombreux recruteurs utilisent pour trier les candidatures. Ils lisent mieux les CV en une colonne, avec des titres classiques (Expérience, Formation, Compétences) et sans éléments graphiques. Les modèles marqués « ATS » respectent ces règles.",
  },
  {
    q: "Dois-je créer un compte ?",
    a: "Non. AstroCV fonctionne sans inscription. Votre CV est enregistré dans votre navigateur et vous pouvez en conserver plusieurs versions dans « Mes CVs ».",
  },
  {
    q: "Mes données sont-elles envoyées sur un serveur ?",
    a: "Non. Le contenu de votre CV reste dans le navigateur de votre ordinateur. Pensez à exporter votre PDF : vider les données du navigateur efface aussi vos CV enregistrés.",
  },
  {
    q: "Puis-je faire un CV de plusieurs pages ?",
    a: "Oui. Si le contenu dépasse une page, le CV passe automatiquement sur la suivante, et vous pouvez aussi demander 2 ou 3 pages dans « Personnaliser ». Des repères de saut de page apparaissent dans l'aperçu.",
  },
  {
    q: "Le service est-il réservé aux métiers du numérique ?",
    a: "Pas du tout. Les exemples couvrent la santé, la vente, la comptabilité, l'éducation, la restauration, le bâtiment, la logistique, le droit, la création et bien d'autres métiers.",
  },
];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-50";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="AstroCV, accueil">
            <LogoMark size={34} />
            <LogoWordmark className="text-xl text-slate-900" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex" aria-label="Navigation principale">
            <a href="#fonctionnalites" className="hover:text-slate-900">Fonctionnalités</a>
            <a href="#modeles" className="hover:text-slate-900">Modèles</a>
            <a href="#ats" className="hover:text-slate-900">ATS</a>
            <a href="#metiers" className="hover:text-slate-900">Métiers</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
          <Link href="/editor" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
            Créer mon CV
          </Link>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_60%_at_70%_0%,rgba(99,102,241,0.14),transparent),radial-gradient(40%_50%_at_10%_20%,rgba(20,184,166,0.12),transparent)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-2 md:pt-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} /> Modèles compatibles ATS inclus
              </span>
              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Un CV qui vous ressemble.
                <span className="block bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  Quel que soit votre métier.
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
                Créez un CV professionnel en quelques minutes : {TEMPLATES.length} modèles, des exemples pour
                chaque métier, une personnalisation complète et un export PDF net. Sans inscription.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/editor" className={btnPrimary}>
                  Créer mon CV <ArrowRight size={18} />
                </Link>
                <a href="#modeles" className={btnSecondary}>Voir les modèles</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {["Sans inscription", "Aperçu en direct", "Export PDF A4"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check size={16} className="text-teal-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* ── Chiffres ── */}
        <section className="border-y border-slate-200 bg-slate-50">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 text-center md:grid-cols-4">
            {[
              [String(TEMPLATES.length), "modèles de CV"],
              [String(TEMPLATES.filter((t) => t.ats).length), "modèles ATS"],
              [String(EXAMPLE_PROFILES.length), "exemples de métiers"],
              ["12+", "couleurs et polices au choix"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="text-3xl font-black text-slate-900">{n}</dt>
                <dd className="text-sm text-slate-600">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Fonctionnalités ── */}
        <section id="fonctionnalites" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Tout pour un CV réussi</h2>
            <p className="mt-3 text-slate-600">Des outils simples, pensés pour tous les profils, du premier emploi au poste de direction.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 text-indigo-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Modèles ── */}
        <section id="modeles" className="scroll-mt-20 bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Des modèles pour chaque profil</h2>
              <p className="mt-3 text-slate-600">Aperçus réels : couleur, police et sections se règlent dans l&apos;éditeur.</p>
            </div>
            <div className="mt-12">
              <TemplateShowcase />
            </div>
            <div className="mt-10 text-center">
              <Link href="/editor" className={btnPrimary}>
                Essayer tous les modèles <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ATS ── */}
        <section id="ats" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-700">Candidatures en ligne</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Passez le tri automatique</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Beaucoup d&apos;entreprises filtrent d&apos;abord les CV avec un logiciel. Un CV trop graphique peut être mal
              lu : sections mélangées, informations perdues. Nos modèles ATS suppriment ce risque.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                "Une seule colonne, lecture de haut en bas",
                "Titres standards : Expérience, Formation, Compétences",
                "Polices sûres (Arial, Calibri, Georgia) et texte sélectionnable",
                "Aucune icône ni photo qui parasite la lecture",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Conseil : envoyez la version ATS aux plateformes d&apos;offres, et un modèle graphique en main propre ou par e-mail.
            </p>
          </div>
          <AtsCompare />
        </section>

        {/* ── Métiers ── */}
        <section id="metiers" className="scroll-mt-20 bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Pour tous les métiers</h2>
              <p className="mt-3 text-slate-300">Chargez un exemple proche de votre poste : intitulés, réalisations et compétences réalistes.</p>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXAMPLE_PROFILES.map((ex) => (
                <li key={ex.id}>
                  <Link
                    href="/editor"
                    className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-teal-400/60 hover:bg-white/10"
                  >
                    <p className="font-bold">{ex.job}</p>
                    <p className="text-sm text-teal-300">{ex.sector}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Étapes ── */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Prêt en 3 étapes</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-slate-200 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 text-lg font-black text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pb-20">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Questions fréquentes</h2>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {item.q}
                  <ChevronDown size={18} className="shrink-0 text-slate-500 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Appel final ── */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-teal-600 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-900/20">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Votre prochain poste commence par un bon CV</h2>
            <p className="mx-auto mt-3 max-w-xl text-indigo-100">Choisissez un modèle, complétez vos informations et téléchargez votre PDF en quelques minutes.</p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              <FileDown size={18} /> Créer mon CV maintenant
            </Link>
          </div>
        </section>
      </main>

      {/* ── Pied de page ── */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark size={26} />
            <LogoWordmark className="text-base text-slate-900" />
          </div>
          <p>Créateur de CV sans inscription. Vos données restent dans votre navigateur.</p>
        </div>
      </footer>
    </div>
  );
}
