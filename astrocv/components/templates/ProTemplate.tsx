"use client";
// ============================================================
// components/templates/ProTemplate.tsx
// Moteur de rendu unique des modèles "Pro" (ATS, sidebar, bandeau,
// timeline…). Le rendu est piloté par un TemplateStyle (proStyles.ts)
// et par les réglages du CV : couleur, police, taille, espacement,
// ordre des sections.
// ============================================================

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Mail, Phone, MapPin, Globe, Link2 } from "lucide-react";
import { CVData, SectionKey } from "@/lib/types";
import { formatPeriod, groupSkillsByCategory, readableOn, FONT_STACKS } from "@/lib/helpers";
import { TemplateStyle } from "./proStyles";

interface ProTemplateProps {
  data: CVData;
  accentHex: string;
  style: TemplateStyle;
}

const SCALE = { sm: 0.92, md: 1, lg: 1.08 } as const;
const SPACING = { compact: 0.75, normal: 1, airy: 1.3 } as const;
const INK = "#1f2937";
const MUTED = "#64748b";

const LABELS: Record<SectionKey, string> = {
  experiences: "Expérience professionnelle",
  education: "Formation",
  skills: "Compétences",
  languages: "Langues",
  projects: "Projets & réalisations",
  interests: "Centres d'intérêt",
};
const ALL_KEYS = Object.keys(LABELS) as SectionKey[];
const SIDE_KEYS: SectionKey[] = ["skills", "languages", "interests"];
const PORTRAIT_SIDE_KEYS: SectionKey[] = ["languages", "interests"];

// Tailles et espacements relatifs aux réglages (--fs / --sp)
// --boost / --fb : ajustement automatique pour remplir (ou faire tenir) les pages
const f = (k: number) => `calc(var(--fs) * var(--fb, 1) * ${k})`;
const s = (k: number) => `calc(var(--sp) * var(--boost, 1) * ${k}px)`;

// Répète les marges internes sur chaque page imprimée
const CLONE: CSSProperties = { boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" };

const PAGE_PX = 297 * (96 / 25.4); // hauteur A4 en px CSS
const LEVEL_PCT: Record<string, number> = { Natif: 100, C2: 95, C1: 85, B2: 70, B1: 55, A2: 35, A1: 20 };

export default function ProTemplate({ data, accentHex: accent, style: T }: ProTemplateProps) {
  const { personal: p, experiences, education, skills, languages, projects, interests, settings } = data;

  const fontKey = settings.fontFamily !== "default" ? settings.fontFamily : T.fontFamily;
  const fs = T.size * (SCALE[settings.fontScale] ?? 1);
  const sp = (SPACING[settings.spacing] ?? 1) * T.density;
  const onAccent = readableOn(accent);
  // Couleur d'appui sur fond coloré/sombre (barres, étiquettes) ; fond sombre : accent si lisible
  const darkSide = T.sidebarTone === "dark";
  const hlColor = darkSide ? (onAccent === "#ffffff" ? "#e2e8f0" : accent) : onAccent;
  const subColor = T.heading === "rule" ? "#374151" : accent;

  const rootRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);

  // Mesure le contenu : nombre de pages nécessaires, puis ajuste les espacements
  // pour remplir la dernière page (ou faire tenir un CV qui dépasse à peine 1 page).
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const prevMin = el.style.minHeight;
    const setBoost = (b: number) => {
      el.style.setProperty("--boost", String(b));
      el.style.setProperty("--fb", String(1 + (b - 1) * 0.2));
    };
    el.style.minHeight = "0px";
    setBoost(1);
    const natural = el.offsetHeight;
    const minPages = settings.pageCount ?? 1;
    const slightlyOver = natural > PAGE_PX && natural < PAGE_PX * 1.07 && minPages < 2;
    const need = slightlyOver ? 1 : Math.max(minPages, Math.ceil(natural / PAGE_PX - 0.02));
    const target = need * PAGE_PX - 6;
    let boost = 1;
    if (settings.fillPage !== false && (slightlyOver || natural < target)) {
      let lo = slightlyOver ? 0.7 : 1;
      let hi = slightlyOver ? 1 : 1.9;
      for (let i = 0; i < 10; i++) {
        const mid = (lo + hi) / 2;
        setBoost(mid);
        if (el.offsetHeight <= target) lo = mid;
        else hi = mid;
      }
      boost = lo;
    }
    setBoost(boost);
    el.style.minHeight = prevMin;
    setPages(need);
  });

  const saved = settings.sectionOrder ?? [];
  const order = [...saved, ...ALL_KEYS.filter((k) => !saved.includes(k))];
  const sideKeys = T.layout === "portrait" ? PORTRAIT_SIDE_KEYS : SIDE_KEYS;
  const mainOrder = order.filter((k) => !sideKeys.includes(k));
  const sideOrder = order.filter((k) => sideKeys.includes(k));

  const showPhoto = T.photo !== "none" && settings.showPhoto && !!p.photoUrl;

  // ── Briques de rendu ───────────────────────────────────────
  const heading = (text: string, inverse?: string) => {
    const base: CSSProperties = {
      fontSize: f(1.05), fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.08em", lineHeight: 1.2, margin: 0,
    };
    let h: CSSProperties;
    if (inverse) {
      h = { ...base, color: inverse, borderBottom: `1px solid ${inverse}66`, paddingBottom: s(3) };
    } else {
      switch (T.heading) {
        case "rule":
          h = { ...base, color: INK, borderBottom: "1px solid #9ca3af", paddingBottom: s(2) };
          break;
        case "accent":
          h = { ...base, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: s(2) };
          break;
        case "title":
          h = { ...base, color: INK, fontSize: f(1.9), fontWeight: 800, textTransform: "none", letterSpacing: "-0.01em" };
          break;
        case "block":
          h = { ...base, color: onAccent, background: accent, padding: `${s(3)} 10px` };
          break;
        case "dash":
          h = { ...base, color: accent, display: "flex", alignItems: "center", gap: 8 };
          break;
        case "bar":
          h = { ...base, color: INK, borderLeft: `4px solid ${accent}`, paddingLeft: 8 };
          break;
        case "pill":
          h = {
            ...base, display: "inline-block", background: accent, color: onAccent,
            padding: `${s(2)} 12px`, borderRadius: 999,
          };
          break;
        case "tint":
          h = { ...base, color: accent, background: `${accent}1f`, padding: `${s(3)} 8px`, borderRadius: 3 };
          break;
        default:
          h = { ...base, color: accent, letterSpacing: "0.16em" };
      }
    }
    return (
      <div style={{ margin: T.heading === "title" && !inverse ? `${s(24)} 0 ${s(12)}` : `${s(15)} 0 ${s(7)}` }}>
        <h2 style={h}>
          {!inverse && T.heading === "dash" && (
            <span style={{ width: 22, height: 3, background: accent, borderRadius: 2, flexShrink: 0 }} />
          )}
          {text}
        </h2>
        {!inverse && T.heading === "title" && (
          <div style={{ width: 34, height: 3, background: INK, marginTop: s(7) }} />
        )}
      </div>
    );
  };

  const bullets = (items: string[]) => {
    const list = items.filter(Boolean);
    if (list.length === 0) return null;
    return (
      <ul style={{ margin: `${s(3)} 0 0`, paddingLeft: "1.2em", listStyle: "disc" }}>
        {list.map((b, i) => (
          <li key={i} style={{ marginBottom: s(2) }}>{b}</li>
        ))}
      </ul>
    );
  };

  const entry = (
    key: string, title: ReactNode, sub: ReactNode, period: string, body: ReactNode
  ) => {
    const titleBlock = (
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: f(1.08) }}>{title}</div>
        {sub && <div style={{ color: subColor, fontWeight: 600, marginTop: 1 }}>{sub}</div>}
      </div>
    );
    const periodEl = period ? (
      <span style={{ color: MUTED, whiteSpace: "nowrap", fontSize: f(0.92) }}>{period}</span>
    ) : null;

    if (T.entries === "dateLeft") {
      return (
        <div key={key} style={{ display: "grid", gridTemplateColumns: "27mm 1fr", gap: 12, marginBottom: s(10), breakInside: "avoid" }}>
          <div style={{ paddingTop: 1 }}>{periodEl}</div>
          <div>{titleBlock}{body}</div>
        </div>
      );
    }
    if (T.entries === "split") {
      return (
        <div key={key} style={{ display: "grid", gridTemplateColumns: "42mm 1fr", gap: 14, marginBottom: s(14), breakInside: "avoid" }}>
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            {period && <div style={{ color: MUTED }}>{period}</div>}
            {sub && <div style={{ color: MUTED, fontSize: f(0.92) }}>{sub}</div>}
          </div>
          <div style={{ marginTop: -3 }}>{body}</div>
        </div>
      );
    }
    if (T.entries === "timeline") {
      return (
        <div
          key={key}
          style={{
            position: "relative", marginLeft: 5, paddingLeft: 16, paddingBottom: s(10),
            borderLeft: `2px solid ${accent}40`, breakInside: "avoid",
          }}
        >
          <span
            style={{
              position: "absolute", left: -7, top: 3, width: 12, height: 12, borderRadius: "50%",
              background: accent, border: "2px solid #fff",
            }}
          />
          {period && <div style={{ color: accent, fontSize: f(0.92), fontWeight: 600 }}>{period}</div>}
          {titleBlock}
          {body}
        </div>
      );
    }
    const card: CSSProperties = T.cards
      ? { background: `${accent}0d`, borderRadius: 6, padding: `${s(7)} 10px` }
      : {};
    return (
      <div key={key} style={{ marginBottom: s(10), breakInside: "avoid", ...card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          {titleBlock}
          {periodEl}
        </div>
        {body}
      </div>
    );
  };

  const para = (text: string, extra?: CSSProperties) =>
    text ? <p style={{ margin: `${s(3)} 0 0`, ...extra }}>{text}</p> : null;

  const skillsBlock = (fg?: string) => {
    const ink = fg ?? INK;
    const chipBorder = fg ? hlColor : accent;
    if (T.skills === "grouped") {
      return Object.entries(groupSkillsByCategory(skills)).map(([cat, list]) => (
        <p key={cat} style={{ margin: `0 0 ${s(3)}` }}>
          <b>{cat} :</b> {list.map((x) => x.name).join(", ")}
        </p>
      ));
    }
    if (T.skills === "bars2") {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `${s(9)} 22px` }}>
          {skills.map((x) => (
            <div key={x.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span>{x.name}</span>
              <span style={{ width: "34%", height: 8, background: "#e5e7eb", flexShrink: 0 }}>
                <i style={{ display: "block", height: "100%", width: `${x.level * 20}%`, background: accent }} />
              </span>
            </div>
          ))}
        </div>
      );
    }
    if (T.skills === "chips") {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {skills.map((x) => (
            <span
              key={x.id}
              style={{
                border: `1px solid ${chipBorder}`, color: ink, borderRadius: 999,
                padding: "1px 9px", fontSize: f(0.92),
              }}
            >
              {x.name}
            </span>
          ))}
        </div>
      );
    }
    return skills.map((x) => (
      <div key={x.id} style={{ marginBottom: s(6) }}>
        {T.skills === "dots" ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span>{x.name}</span>
            <span style={{ display: "flex", gap: 3, flexShrink: 0 }}>
              {[1, 2, 3, 4, 5].map((d) => (
                <i
                  key={d}
                  style={{
                    width: 7, height: 7, borderRadius: "50%", display: "block",
                    background: d <= x.level ? (fg ? hlColor : accent) : `${ink}30`,
                  }}
                />
              ))}
            </span>
          </div>
        ) : (
          <>
            <div>{x.name}</div>
            <div style={{ height: 4, borderRadius: 2, background: `${ink}30`, marginTop: 2 }}>
              <div style={{ width: `${x.level * 20}%`, height: "100%", borderRadius: 2, background: fg ? hlColor : accent }} />
            </div>
          </>
        )}
      </div>
    ));
  };

  const languagesBlock = (fg?: string) => {
    if (T.languages === "list") {
      return languages.map((l) => (
        <div key={l.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: s(3) }}>
          <span>{l.name}</span>
          <span style={{ opacity: 0.7 }}>{l.level}</span>
        </div>
      ));
    }
    if (T.languages === "bars") {
      return languages.map((l) => (
        <div key={l.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: s(7) }}>
          <span>{l.name}</span>
          <span style={{ width: "52%", height: 8, background: `${fg ?? INK}30`, flexShrink: 0 }}>
            <i style={{ display: "block", height: "100%", width: `${LEVEL_PCT[l.level] ?? 50}%`, background: fg ?? accent }} />
          </span>
        </div>
      ));
    }
    if (T.languages === "chips") {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {languages.map((l) => (
            <span
              key={l.id}
              style={{
                border: `1px solid ${fg ? hlColor : accent}`, borderRadius: 999,
                padding: "1px 9px", fontSize: f(0.92),
              }}
            >
              {l.name} · {l.level}
            </span>
          ))}
        </div>
      );
    }
    return <p style={{ margin: 0 }}>{languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>;
  };

  const interestsBlock = (fg?: string) => {
    const list = interests.filter(Boolean);
    if (T.skills === "chips") {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {list.map((x, i) => (
            <span key={i} style={{ border: `1px solid ${fg ?? "#cbd5e1"}`, borderRadius: 999, padding: "1px 9px", fontSize: f(0.92) }}>
              {x}
            </span>
          ))}
        </div>
      );
    }
    return <p style={{ margin: 0 }}>{list.join(" · ")}</p>;
  };

  const section = (key: SectionKey, inverse?: string): ReactNode => {
    switch (key) {
      case "experiences":
        if (!experiences.length) return null;
        return (
          <section key={key}>
            {heading(LABELS[key], inverse)}
            {experiences.map((e) =>
              entry(
                e.id,
                e.position,
                [e.company, e.location].filter(Boolean).join(" · "),
                formatPeriod(e.startMonth, e.endMonth, e.current),
                <>{para(e.description)}{bullets(e.bullets)}</>
              )
            )}
          </section>
        );
      case "education":
        if (!education.length) return null;
        return (
          <section key={key}>
            {heading(LABELS[key], inverse)}
            {education.map((e) =>
              entry(
                e.id,
                e.degree,
                [e.school, e.location].filter(Boolean).join(" · "),
                formatPeriod(e.startMonth, e.endMonth, e.current),
                <>
                  {para(e.mention, { fontStyle: "italic", color: MUTED })}
                  {para(e.description)}
                </>
              )
            )}
          </section>
        );
      case "projects":
        if (!projects.length) return null;
        return (
          <section key={key}>
            {heading(LABELS[key], inverse)}
            {projects.map((pr) =>
              entry(
                pr.id,
                pr.title,
                [pr.link, pr.github].filter(Boolean).join(" · "),
                "",
                <>
                  {para(pr.description)}
                  {pr.technologies.length > 0 &&
                    para(`Outils : ${pr.technologies.join(", ")}`, { color: MUTED, fontSize: f(0.92) })}
                </>
              )
            )}
          </section>
        );
      case "skills":
        if (!skills.length) return null;
        return <section key={key}>{heading(LABELS[key], inverse)}{skillsBlock(inverse)}</section>;
      case "languages":
        if (!languages.length) return null;
        return <section key={key}>{heading(LABELS[key], inverse)}{languagesBlock(inverse)}</section>;
      case "interests":
        if (!interests.filter(Boolean).length) return null;
        return <section key={key}>{heading(LABELS[key], inverse)}{interestsBlock(inverse)}</section>;
    }
  };

  const summary = (inverse?: string) =>
    p.summary ? (
      <section>
        {heading("Profil", inverse)}
        <p style={{ margin: 0 }}>{p.summary}</p>
      </section>
    ) : null;

  const nameBlock = (inverse?: string) => (
    <div>
      <h1
        style={{
          fontSize: f(T.nameSize), fontWeight: T.nameWeight, lineHeight: 1.1, margin: 0,
          letterSpacing: T.nameCaps ? "0.06em" : T.nameWeight <= 400 ? "0.03em" : undefined,
          textTransform: T.nameCaps ? "uppercase" : undefined,
          color: inverse ?? (T.nameAccent ? accent : INK),
        }}
      >
        {T.layout === "portrait" ? <>{p.firstName}<br />{p.lastName}</> : <>{p.firstName} {p.lastName}</>}
      </h1>
      {p.title && (
        <div style={{ fontSize: f(1.22), marginTop: s(4), color: inverse ?? MUTED }}>{p.title}</div>
      )}
    </div>
  );

  const contactItems = [
    { Icon: Mail, label: "Email", text: p.email },
    { Icon: Phone, label: "Téléphone", text: p.phone },
    { Icon: MapPin, label: "Adresse", text: [p.address, p.city, p.country].filter(Boolean).join(", ") },
    { Icon: Link2, label: "LinkedIn", text: p.linkedin },
    { Icon: Link2, label: "Lien", text: p.github },
    { Icon: Globe, label: "Site web", text: p.website },
  ].filter((i) => i.text);

  const contact = (stacked: boolean, center = false) => (
    <div
      style={{
        display: "flex", flexWrap: "wrap", alignItems: stacked ? "flex-start" : "center",
        flexDirection: stacked ? "column" : "row", gap: stacked ? s(5) : `${s(3)} 10px`,
        justifyContent: center ? "center" : undefined,
      }}
    >
      {contactItems.map(({ Icon, text, label }, i) =>
        T.layout === "portrait" ? (
          <div key={i} style={{ marginBottom: s(7), wordBreak: "break-word" }}>
            <div style={{ opacity: 0.7, fontSize: f(0.9) }}>{label} :</div>
            <div>{text}</div>
          </div>
        ) : (
        <span key={i} style={{ display: "inline-flex", alignItems: "flex-start", gap: 6, wordBreak: "break-word" }}>
          {T.icons ? (
            <Icon size={fs * 1.15} style={{ flexShrink: 0, marginTop: 1 }} />
          ) : (
            !stacked && i > 0 && <span style={{ opacity: 0.4 }}>|</span>
          )}
          {text}
        </span>
        )
      )}
    </div>
  );

  const photo = (size: number, border: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.photoUrl}
      alt={`${p.firstName} ${p.lastName}`}
      style={{
        width: size, height: size, objectFit: "cover", border, flexShrink: 0,
        borderRadius: T.photo === "round" ? "50%" : 8, display: "block",
      }}
    />
  );

  // ── Racine ─────────────────────────────────────────────────
  const root: CSSProperties = {
    "--fs": `${fs}px`,
    "--sp": sp,
    width: "210mm", minHeight: `${pages * 297}mm`, background: "#fff", color: INK,
    fontFamily: FONT_STACKS[fontKey], fontSize: "var(--fs)", lineHeight: 1.45,
  } as CSSProperties;

  // 1) Une colonne (ATS, minimal, timeline)
  if (T.layout === "single") {
    const center = T.header === "center";
    return (
      <div ref={rootRef} style={root}>
        <div style={{ padding: "40px 44px", ...CLONE }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 20,
              justifyContent: center ? "center" : "space-between",
              textAlign: center ? "center" : "left",
            }}
          >
            <div>
              {nameBlock()}
              <div style={{ marginTop: s(8), color: "#374151" }}>{contact(false, center)}</div>
            </div>
            {showPhoto && photo(88, `3px solid ${accent}`)}
          </div>
          {T.headerRule && (
            <div style={{ height: 2, background: accent, marginTop: s(14) }} />
          )}
          {summary()}
          {order.map((k) => section(k))}
        </div>
      </div>
    );
  }

  // 2) Bandeau coloré + 2 colonnes
  if (T.layout === "band") {
    return (
      <div ref={rootRef} style={{ ...root, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            background: accent, color: onAccent, padding: "34px 44px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
            ...(T.bandShape === "slant" && {
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)", paddingBottom: 64,
            }),
            ...(T.bandShape === "round" && {
              borderBottomLeftRadius: 44, borderBottomRightRadius: 44, paddingBottom: 40,
            }),
          }}
        >
          <div>
            {nameBlock(onAccent)}
            <div style={{ marginTop: s(10) }}>{contact(false)}</div>
          </div>
          {showPhoto && photo(96, `3px solid ${onAccent}`)}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <main style={{ flex: 1, minWidth: 0, padding: "8px 26px 34px 44px", ...CLONE }}>
            {summary()}
            {mainOrder.map((k) => section(k))}
          </main>
          <aside style={{ width: "64mm", flexShrink: 0, background: "#f8fafc", padding: "8px 24px 34px 22px" }}>
            {sideOrder.map((k) => section(k))}
          </aside>
        </div>
      </div>
    );
  }

  // 3) Portrait : photo pleine largeur en tête de colonne sombre
  if (T.layout === "portrait") {
    const hasPhoto = settings.showPhoto && !!p.photoUrl;
    return (
      <div ref={rootRef} style={{ ...root, display: "flex" }}>
        <aside style={{ width: "76mm", flexShrink: 0, background: accent, color: onAccent }}>
          {hasPhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photoUrl} alt={`${p.firstName} ${p.lastName}`} style={{ width: "100%", height: "86mm", objectFit: "cover", display: "block" }} />
          )}
          <div style={{ padding: hasPhoto ? "28px 26px 34px" : "48px 26px 34px" }}>
            {nameBlock(onAccent)}
            <div style={{ width: 54, height: 2, background: onAccent, margin: `${s(10)} 0 ${s(4)}` }} />
            {contactItems.length > 0 && (
              <section>
                {heading("Contact", onAccent)}
                {contact(true)}
              </section>
            )}
            {sideOrder.map((k) => section(k, onAccent))}
          </div>
        </aside>
        <main style={{ flex: 1, minWidth: 0, padding: "30px 40px 40px 42px", ...CLONE }}>
          {summary()}
          {mainOrder.map((k) => section(k))}
        </main>
      </div>
    );
  }

  // 4) Sidebar gauche ou droite
  const accentTone = T.sidebarTone === "accent";
  const inverse = accentTone ? onAccent : darkSide ? "#f1f5f9" : undefined;
  const sideBg =
    accentTone ? accent : darkSide ? "#111827" : T.sidebarTone === "tint" ? `${accent}1f` : "#f1f5f9";
  const aside = (
    <aside
      style={{
        width: "68mm", flexShrink: 0, padding: "34px 20px",
        background: sideBg, color: inverse ?? INK,
      }}
    >
      {showPhoto && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: s(8) }}>
          {photo(112, inverse ? `3px solid ${hlColor}` : `3px solid ${accent}`)}
        </div>
      )}
      {contactItems.length > 0 && (
        <section>
          {heading("Contact", inverse)}
          {contact(true)}
        </section>
      )}
      {sideOrder.map((k) => section(k, inverse))}
    </aside>
  );
  const main = (
    <main style={{ flex: 1, minWidth: 0, padding: "36px 32px 34px", ...CLONE }}>
      {nameBlock()}
      {summary()}
      {mainOrder.map((k) => section(k))}
    </main>
  );
  return (
    <div ref={rootRef} style={{ ...root, display: "flex" }}>
      {T.layout === "sidebar-left" ? <>{aside}{main}</> : <>{main}{aside}</>}
    </div>
  );
}
