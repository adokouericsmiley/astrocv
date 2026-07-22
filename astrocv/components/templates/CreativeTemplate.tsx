"use client";
// ============================================================
// components/templates/CreativeTemplate.tsx
// Template "Élégant Leaf" — Inspiré de l'image 2
// Badge d'en-tête en forme de feuille (leaf badge) pour le nom,
// bande latérale sombre/charcoal avec découpe incurvée,
// puces étoiles (✦) sur les titres de sections et badges arrondies pour les sous-titres.
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";

interface CreativeTemplateProps {
  data: CVData;
  accentHex: string;
}

// ── Icône étoile 4 branches ✦ ─────────────────────────────────
function StarIcon({ color = "#1e293b", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// ── Titre de section avec puce étoile ✦ ──────────────────────
function SectionHeader({ title, accentHex }: { title: string; accentHex: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", position: "relative" }}>
      {/* Étoile ✦ sur l'axe vertical */}
      <div style={{
        position: "absolute",
        left: "-21px",
        background: "#ffffff",
        padding: "2px 0",
      }}>
        <StarIcon color={accentHex} size={14} />
      </div>
      <h2 style={{
        fontSize: "14px",
        fontWeight: 700,
        color: "#1c1917",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        margin: 0,
      }}>
        {title}
      </h2>
    </div>
  );
}

export default function CreativeTemplate({ data, accentHex }: CreativeTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  // Couleur de la sidebar : gris très sombre / anthracite (#263238 ou accent dark)
  const sidebarBg = accentHex !== "#6366f1" ? accentHex : "#263238";
  const pillTagBg = "rgba(255, 255, 255, 0.95)";

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Georgia', 'Playfair Display', serif, sans-serif",
        fontSize: "11px",
        color: "#1c1917",
        display: "flex",
        flexDirection: "row",
        background: "#ffffff",
      }}
    >
      {/* ── COLONNE GAUCHE (SIDEBAR SOMBRE INCURVÉE) ── */}
      <div
        style={{
          width: "74mm",
          minHeight: "297mm",
          background: sidebarBg,
          color: "#ffffff",
          padding: "24px 16px 20px 16px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderTopRightRadius: "60px",
          borderBottomRightRadius: "60px",
        }}
      >
        {/* Photo de profil ovale grand format */}
        {settings.showPhoto && personal.photoUrl ? (
          <div style={{ marginBottom: "24px", textAlign: "center", marginTop: "10px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              style={{
                width: "115px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #ffffff",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <div style={{ height: "30px" }} />
        )}

        {/* SECTION INFORMATIONS (Coordonnées) */}
        <div style={{ width: "100%", marginBottom: "24px", textAlign: "center" }}>
          <div
            style={{
              background: pillTagBg,
              color: "#0f172a",
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "5px 16px",
              borderRadius: "14px",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            INFORMATIONS
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6 }}>
            {personal.phone && <p style={{ margin: "2px 0" }}>{personal.phone}</p>}
            {personal.email && <p style={{ margin: "2px 0", wordBreak: "break-all" }}>{personal.email}</p>}
            {(personal.city || personal.country) && (
              <p style={{ margin: "2px 0" }}>{[personal.city, personal.country].filter(Boolean).join(", ")}</p>
            )}
            {personal.website && <p style={{ margin: "2px 0", wordBreak: "break-all" }}>{personal.website}</p>}
          </div>
        </div>

        {/* SECTION LANGUES */}
        {languages.length > 0 && (
          <div style={{ width: "100%", marginBottom: "24px", textAlign: "center" }}>
            <div
              style={{
                background: pillTagBg,
                color: "#0f172a",
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "5px 16px",
                borderRadius: "14px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              LANGUES
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6 }}>
              {languages.map((lang) => (
                <p key={lang.id} style={{ margin: "3px 0" }}>
                  <span style={{ fontWeight: 700 }}>{lang.name}</span> ({lang.level})
                </p>
              ))}
            </div>
          </div>
        )}

        {/* SECTION INTÉRÊTS */}
        {interests.length > 0 && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                background: pillTagBg,
                color: "#0f172a",
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "5px 16px",
                borderRadius: "14px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              INTÉRÊTS
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6 }}>
              {interests.filter(Boolean).map((interest, i) => (
                <p key={i} style={{ margin: "2px 0" }}>
                  {interest}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── COLONNE DROITE (CONTENU PRINCIPAL) ── */}
      <div style={{ flex: 1, padding: "24px 22px 20px 24px" }}>
        {/* EN-TÊTE : BADGE LEAF POUR NOM & PRÉNOM */}
        <div style={{ marginBottom: "22px", textAlign: "left" }}>
          <div
            style={{
              background: sidebarBg,
              color: "#ffffff",
              padding: "16px 24px",
              borderRadius: "0 50px 50px 0",
              display: "inline-block",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minWidth: "260px",
            }}
          >
            <h1 style={{
              fontSize: "34px",
              fontWeight: 800,
              fontFamily: "'Georgia', 'Playfair Display', serif",
              margin: 0,
              lineHeight: 1.05,
              color: "#ffffff",
              textTransform: "uppercase",
            }}>
              {personal.lastName}
            </h1>
            <h1 style={{
              fontSize: "28px",
              fontWeight: 400,
              fontFamily: "'Georgia', 'Playfair Display', serif",
              margin: "2px 0 0 0",
              lineHeight: 1.05,
              color: "#ffffff",
            }}>
              {personal.firstName}
            </h1>
            {personal.title && (
              <p style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "6px",
                fontFamily: "system-ui, sans-serif",
              }}>
                {personal.title}
              </p>
            )}
          </div>
        </div>

        {/* À PROPOS DE MOI */}
        {personal.summary && (
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#0f172a",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
            }}>
              À PROPOS DE MOI
            </h2>
            <p style={{
              fontSize: "10px",
              color: "#475569",
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
              fontFamily: "'Georgia', serif",
            }}>
              {personal.summary}
            </p>
          </div>
        )}

        {/* ZONE AVEC AXE VERTICAL ✦ */}
        <div style={{
          borderLeft: `1.5px solid ${sidebarBg}`,
          paddingLeft: "16px",
          marginLeft: "6px",
          position: "relative",
        }}>
          {/* EXPÉRIENCES PROFESSIONNELLES */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <SectionHeader title="Expériences professionnelles" accentHex={sidebarBg} />
              {experiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "14px" }}>
                  <p style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    {exp.company} — <span style={{ fontWeight: 400, color: "#64748b" }}>{formatPeriod(exp.startMonth, exp.endMonth, exp.current)}</span>
                  </p>
                  <p style={{
                    fontSize: "10.5px",
                    fontStyle: "italic",
                    color: sidebarBg,
                    margin: "2px 0 4px 0",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {exp.position}
                  </p>
                  {exp.description && (
                    <p style={{
                      fontSize: "9.5px",
                      color: "#475569",
                      margin: "3px 0",
                      lineHeight: 1.5,
                      fontFamily: "system-ui, sans-serif",
                    }}>
                      {exp.description}
                    </p>
                  )}
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul style={{ margin: "2px 0 0 0", paddingLeft: "12px", fontFamily: "system-ui, sans-serif" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.5, marginBottom: "2px" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FORMATIONS */}
          {education.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <SectionHeader title="Formations" accentHex={sidebarBg} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "12px" }}>
                  <p style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    {edu.school} — <span style={{ fontWeight: 400, color: "#64748b" }}>{formatPeriod(edu.startMonth, edu.endMonth, edu.current)}</span>
                  </p>
                  <p style={{
                    fontSize: "10.5px",
                    fontStyle: "italic",
                    color: sidebarBg,
                    margin: "2px 0 0 0",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {edu.degree}
                    {edu.mention && <span style={{ color: "#64748b", fontStyle: "normal" }}> — {edu.mention}</span>}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* COMPÉTENCES */}
          {skills.length > 0 && (
            <div>
              <SectionHeader title="Compétences" accentHex={sidebarBg} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontFamily: "system-ui, sans-serif" }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ fontSize: "10px", color: "#334155" }}>
                    • {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
