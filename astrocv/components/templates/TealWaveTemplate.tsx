"use client";
// ============================================================
// components/templates/TealWaveTemplate.tsx
// Template "Teal Wave Geometric" — Inspiré de l'image 1
// Motifs géométriques vagues turquoises, photo circulaire cerclée,
// titres de section sous forme de pilules/capsules, jauges de compétences,
// et boutons d'icônes rondes pour les contacts.
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface TealWaveTemplateProps {
  data: CVData;
  accentHex: string;
}

export default function TealWaveTemplate({ data, accentHex }: TealWaveTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  // Utilise accentHex ou un turquoise par défaut (#00a896 / #009688)
  const themeColor = accentHex !== "#6366f1" ? accentHex : "#00a896";

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── BANNIÈRE HAUTE VAGUE GÉOMÉTRIQUE ── */}
      <div
        style={{
          height: "110px",
          background: themeColor,
          clipPath: "polygon(0 0, 100% 0, 100% 40%, 75% 90%, 0 45%)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <div
        style={{
          height: "90px",
          background: "rgba(255, 255, 255, 0.2)",
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 25%)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      />

      {/* ── CONTENU PRINCIPAL EN 2 COLONNES ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          paddingTop: "40px",
          zIndex: 3,
        }}
      >
        {/* ── COLONNE GAUCHE (38% de largeur) ── */}
        <div
          style={{
            width: "82mm",
            padding: "20px 18px 20px 22px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Photo de profil cerclée */}
          {settings.showPhoto && personal.photoUrl ? (
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  padding: "5px",
                  border: `3px solid ${themeColor}`,
                  margin: "0 auto",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={`${personal.firstName} ${personal.lastName}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ height: "40px" }} />
          )}

          {/* Nom & Titre (Colonne Gauche) */}
          <div style={{ textAlign: "center", marginBottom: "22px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {personal.lastName} {personal.firstName}
            </h1>
            {personal.title && (
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "6px",
                }}
              >
                {personal.title}
              </p>
            )}
            {personal.summary && (
              <p
                style={{
                  fontSize: "9.5px",
                  color: "#64748b",
                  marginTop: "8px",
                  lineHeight: 1.5,
                  textAlign: "justify",
                }}
              >
                {personal.summary}
              </p>
            )}
          </div>

          {/* SECTION CONTACT */}
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textAlign: "center",
                marginBottom: "14px",
              }}
            >
              CONTACT
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {personal.email && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: themeColor,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={13} />
                  </div>
                  <span style={{ fontSize: "10px", color: "#334155", wordBreak: "break-all" }}>
                    {personal.email}
                  </span>
                </div>
              )}

              {personal.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: themeColor,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={13} />
                  </div>
                  <span style={{ fontSize: "10px", color: "#334155" }}>{personal.phone}</span>
                </div>
              )}

              {(personal.city || personal.country) && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: themeColor,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={13} />
                  </div>
                  <span style={{ fontSize: "10px", color: "#334155" }}>
                    {[personal.city, personal.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {personal.website && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: themeColor,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Globe size={13} />
                  </div>
                  <span style={{ fontSize: "10px", color: "#334155", wordBreak: "break-all" }}>
                    {personal.website}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION COMPÉTENCES (Jauges Horizontales) */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  marginBottom: "14px",
                }}
              >
                COMPÉTENCES
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "3px",
                      }}
                    >
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#334155" }}>
                        {skill.name}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        background: "#e2e8f0",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(skill.level / 5) * 100}%`,
                          background: themeColor,
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── COLONNE DROITE (62% de largeur) ── */}
        <div style={{ flex: 1, padding: "20px 24px 20px 10px" }}>
          {/* SECTION ÉDUCATION / FORMATIONS */}
          {education.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              {/* Titre Pilule Teal */}
              <div
                style={{
                  background: themeColor,
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "7px 20px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "14px",
                }}
              >
                FORMATIONS
              </div>
              <div
                style={{
                  borderLeft: `2px solid ${themeColor}`,
                  paddingLeft: "14px",
                  marginLeft: "10px",
                }}
              >
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: "14px", position: "relative" }}>
                    {/* Puce point sur l'axe */}
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: themeColor,
                        position: "absolute",
                        left: "-19px",
                        top: "4px",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: themeColor }}>
                        {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 800,
                        color: "#0f172a",
                        margin: "2px 0 0 0",
                        textTransform: "uppercase",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: "10px", color: "#475569", margin: "1px 0" }}>
                      {edu.school} {edu.location && `— ${edu.location}`}
                    </p>
                    {edu.description && (
                      <p style={{ fontSize: "9.5px", color: "#64748b", margin: "2px 0" }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION EXPÉRIENCES PROFESSIONNELLES */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  background: themeColor,
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "7px 20px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "14px",
                }}
              >
                EXPÉRIENCES
              </div>
              <div
                style={{
                  borderLeft: `2px solid ${themeColor}`,
                  paddingLeft: "14px",
                  marginLeft: "10px",
                }}
              >
                {experiences.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "14px", position: "relative" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: themeColor,
                        position: "absolute",
                        left: "-19px",
                        top: "4px",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: themeColor }}>
                        {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 800,
                        color: "#0f172a",
                        margin: "2px 0 0 0",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#475569", margin: "1px 0" }}>
                      {exp.company} {exp.location && `— ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p style={{ fontSize: "9.5px", color: "#64748b", margin: "3px 0", lineHeight: 1.4 }}>
                        {exp.description}
                      </p>
                    )}
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul style={{ margin: "2px 0 0 0", paddingLeft: "12px" }}>
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ fontSize: "9.5px", color: "#64748b", lineHeight: 1.4 }}>
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

          {/* SECTION LANGUES (Cercles / Badges) */}
          {languages.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  background: themeColor,
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "7px 20px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "14px",
                }}
              >
                LANGUES
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      border: `3px solid ${themeColor}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "4px",
                    }}
                  >
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#0f172a" }}>
                      {lang.name}
                    </span>
                    <span style={{ fontSize: "8.5px", color: themeColor, fontWeight: 700 }}>
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BANNIÈRE BASSE VAGUE TURQUOISE ── */}
      <div
        style={{
          height: "40px",
          background: themeColor,
          clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </div>
  );
}
