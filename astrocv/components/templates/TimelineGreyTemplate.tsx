"use client";
// ============================================================
// components/templates/TimelineGreyTemplate.tsx
// Template "Timeline Arch Grey" — Inspiré de l'image 3
// Bannière d'en-tête grise avec nom/titre en lettres majuscules blanches,
// photo en cadre voûte/arche (arch frame), timeline avec nœuds circulaires (○)
// dans la colonne droite pour les expériences.
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface TimelineGreyTemplateProps {
  data: CVData;
  accentHex: string;
}

export default function TimelineGreyTemplate({ data, accentHex }: TimelineGreyTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  // Utilise accentHex ou un gris anthracite chic (#475569 / #334155)
  const headerBg = accentHex !== "#6366f1" ? accentHex : "#475569";
  const sidebarBg = "#e2e8f0";

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: "11px",
        color: "#1e293b",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
      }}
    >
      {/* ── BANNIÈRE SUPERIEURE GRIS ANTHRACITE ── */}
      <div
        style={{
          display: "flex",
          height: "130px",
          background: "#ffffff",
        }}
      >
        {/* Partie gauche de la bannière (au-dessus de la sidebar) */}
        <div
          style={{
            width: "72mm",
            background: sidebarBg,
            height: "100%",
          }}
        />

        {/* Partie droite de la bannière : Nom & Titre en majuscules blanches */}
        <div
          style={{
            flex: 1,
            background: headerBg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "30px",
            paddingRight: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {personal.lastName}
            <br />
            {personal.firstName}
          </h1>
          {personal.title && (
            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginTop: "6px",
              }}
            >
              {personal.title}
            </p>
          )}
        </div>
      </div>

      {/* ── CORPS EN 2 COLONNES ── */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* ── COLONNE GAUCHE (SIDEBAR GRIS CLAIR) ── */}
        <div
          style={{
            width: "72mm",
            background: sidebarBg,
            padding: "0 16px 20px 16px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Photo de profil en cadre ARCHE / VOÛTE (Arch Frame) - Chevauche la bannière */}
          {settings.showPhoto && personal.photoUrl && (
            <div style={{ marginTop: "-80px", marginBottom: "20px", textAlign: "center" }}>
              <div
                style={{
                  width: "115px",
                  height: "140px",
                  borderRadius: "60px 60px 0 0",
                  overflow: "hidden",
                  border: "4px solid #ffffff",
                  margin: "0 auto",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                  background: "#cbd5e1",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={`${personal.firstName} ${personal.lastName}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

          {/* SECTION FORMATIONS (SIDEBAR) */}
          {education.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid #94a3b8",
                  paddingBottom: "4px",
                  marginBottom: "10px",
                }}
              >
                ÉDUCATION
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "12px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>
                    {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                  </p>
                  <p
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 800,
                      color: "#0f172a",
                      textTransform: "uppercase",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: "10px", color: "#475569" }}>{edu.school}</p>
                </div>
              ))}
            </div>
          )}

          {/* SECTION COMPÉTENCES */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid #94a3b8",
                  paddingBottom: "4px",
                  marginBottom: "10px",
                }}
              >
                COMPÉTENCES
              </h2>
              <ul style={{ margin: 0, paddingLeft: "14px", color: "#334155" }}>
                {skills.map((skill) => (
                  <li key={skill.id} style={{ fontSize: "10px", marginBottom: "4px" }}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION LANGUES */}
          {languages.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid #94a3b8",
                  paddingBottom: "4px",
                  marginBottom: "10px",
                }}
              >
                LANGUES
              </h2>
              <ul style={{ margin: 0, paddingLeft: "14px", color: "#334155" }}>
                {languages.map((lang) => (
                  <li key={lang.id} style={{ fontSize: "10px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600 }}>{lang.name}</span> ({lang.level})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION CONTACT */}
          <div style={{ marginTop: "auto", paddingTop: "14px" }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderBottom: "1px solid #94a3b8",
                paddingBottom: "4px",
                marginBottom: "10px",
              }}
            >
              CONTACT
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {personal.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone size={11} className="text-slate-600" />
                  <span style={{ fontSize: "9.5px", color: "#334155" }}>{personal.phone}</span>
                </div>
              )}
              {personal.email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Mail size={11} className="text-slate-600" />
                  <span style={{ fontSize: "9.5px", color: "#334155", wordBreak: "break-all" }}>
                    {personal.email}
                  </span>
                </div>
              )}
              {(personal.city || personal.country) && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={11} className="text-slate-600" />
                  <span style={{ fontSize: "9.5px", color: "#334155" }}>
                    {[personal.city, personal.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {personal.website && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Globe size={11} className="text-slate-600" />
                  <span style={{ fontSize: "9.5px", color: "#334155" }}>{personal.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── COLONNE DROITE (TIMELINE PRINCIPALE) ── */}
        <div style={{ flex: 1, padding: "24px 24px 20px 28px" }}>
          {/* PROFIL / À PROPOS */}
          {personal.summary && (
            <div style={{ marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#0f172a",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: 0,
                  }}
                >
                  RÉSUMÉ PROFESSIONNEL
                </h2>
                <div style={{ flex: 1, height: "1px", background: "#cbd5e1" }} />
              </div>
              <p style={{ fontSize: "10px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                {personal.summary}
              </p>
            </div>
          )}

          {/* EXPÉRIENCES PROFESSIONNELLES AVEC AXE TIMELINE ○ */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#0f172a",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: 0,
                  }}
                >
                  EXPÉRIENCES
                </h2>
                <div style={{ flex: 1, height: "1px", background: "#cbd5e1" }} />
              </div>

              {/* Axe vertical timeline */}
              <div
                style={{
                  borderLeft: `1.5px solid #cbd5e1`,
                  paddingLeft: "20px",
                  marginLeft: "8px",
                }}
              >
                {experiences.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "16px", position: "relative" }}>
                    {/* Nœud circulaire ○ de la timeline */}
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: `2px solid ${headerBg}`,
                        background: "#ffffff",
                        position: "absolute",
                        left: "-27px",
                        top: "2px",
                      }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          color: "#0f172a",
                          textTransform: "uppercase",
                          margin: 0,
                        }}
                      >
                        {exp.position}
                      </h3>
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          color: "#64748b",
                          marginLeft: "auto",
                        }}
                      >
                        {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                      </span>
                    </div>

                    <p style={{ fontSize: "10px", fontWeight: 700, color: headerBg, margin: "1px 0 4px 0" }}>
                      {exp.company} {exp.location && `— ${exp.location}`}
                    </p>

                    {exp.description && (
                      <p style={{ fontSize: "9.5px", color: "#475569", margin: "3px 0", lineHeight: 1.4 }}>
                        {exp.description}
                      </p>
                    )}

                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul style={{ margin: "2px 0 0 0", paddingLeft: "12px" }}>
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.4 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJETS */}
          {projects.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#0f172a",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: 0,
                  }}
                >
                  PROJETS
                </h2>
                <div style={{ flex: 1, height: "1px", background: "#cbd5e1" }} />
              </div>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    {proj.title}
                    {proj.link && (
                      <span style={{ fontSize: "9px", color: headerBg, marginLeft: "6px" }}>
                        ↗ {proj.link}
                      </span>
                    )}
                  </p>
                  {proj.description && (
                    <p style={{ fontSize: "9.5px", color: "#475569", margin: "2px 0", lineHeight: 1.4 }}>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
