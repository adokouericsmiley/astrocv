"use client";
// ============================================================
// components/templates/CreativeTemplate.tsx
// Template "Élégant / Créatif" — Inspiré du design haute couture / éditorial
// Typographie raffinée, bande latérale beige/nude, ligne verticale avec
// puces étoiles (✦), et badges arrondies pour les compétences.
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

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

// ── Item de contact avec icône fine ──────────────────────────
function ContactBlock({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "14px" }}>
      <div style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        border: "1px solid #a8a29e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "4px",
        color: "#57534e",
      }}>
        <Icon size={13} />
      </div>
      <span style={{ fontSize: "9.5px", color: "#44403c", wordBreak: "break-all", lineHeight: 1.3 }}>{value}</span>
    </div>
  );
}

// ── Titre de section avec puce étoile ✦ ──────────────────────
function SectionHeader({ title, accentHex }: { title: string; accentHex: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", position: "relative" }}>
      {/* Étoile sur l'axe vertical */}
      <div style={{
        position: "absolute",
        left: "-21px",
        background: "#ffffff",
        padding: "2px 0",
      }}>
        <StarIcon color={accentHex} size={14} />
      </div>
      <h2 style={{
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'Georgia', 'Playfair Display', serif, sans-serif",
        color: "#1c1917",
        letterSpacing: "0.02em",
        margin: 0,
      }}>
        {title}
      </h2>
    </div>
  );
}

export default function CreativeTemplate({ data, accentHex }: CreativeTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  // Couleur de la sidebar : teinte beige/nude chaleureuse et élégante
  const sidebarBg = "#eae6df";
  const pillBg = "#dcd6cb";

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Georgia', 'Times New Roman', serif, sans-serif",
        fontSize: "11px",
        color: "#292524",
        display: "flex",
        flexDirection: "row",
        background: "#ffffff",
      }}
    >
      {/* ── Colonne gauche (Sidebar Nude/Beige) ── */}
      <div
        style={{
          width: "72mm",
          minHeight: "297mm",
          background: sidebarBg,
          padding: "24px 16px 20px 16px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Photo circulaire grand format avec courbe */}
        {settings.showPhoto && personal.photoUrl ? (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              style={{
                width: "105px",
                height: "105px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #ffffff",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <div style={{ height: "16px" }} />
        )}

        {/* Coordonnées / Contact */}
        <div style={{ width: "100%", marginTop: "10px", marginBottom: "24px" }}>
          <ContactBlock icon={Phone} value={personal.phone} />
          <ContactBlock icon={Mail} value={personal.email} />
          {(personal.city || personal.country) && (
            <ContactBlock
              icon={MapPin}
              value={[personal.city, personal.country].filter(Boolean).join(", ")}
            />
          )}
          <ContactBlock icon={Globe} value={personal.website} />
        </div>

        {/* Langues */}
        {languages.length > 0 && (
          <div style={{ width: "100%", textAlign: "center", marginBottom: "24px" }}>
            <h3 style={{
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "'Georgia', serif",
              color: "#1c1917",
              marginBottom: "10px",
              letterSpacing: "0.03em",
            }}>
              Langues
            </h3>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: "10.5px", color: "#44403c", marginBottom: "4px", lineHeight: 1.4 }}>
                <span style={{ fontWeight: 600 }}>{lang.name}</span>
                <span style={{ color: "#78716c", fontSize: "9.5px" }}> — {lang.level}</span>
              </div>
            ))}
          </div>
        )}

        {/* Centres d'intérêt / Loisirs */}
        {interests.length > 0 && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h3 style={{
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "'Georgia', serif",
              color: "#1c1917",
              marginBottom: "10px",
              letterSpacing: "0.03em",
            }}>
              Loisirs
            </h3>
            {interests.filter(Boolean).map((interest, i) => (
              <p key={i} style={{ fontSize: "10.5px", color: "#44403c", margin: "0 0 4px 0", lineHeight: 1.4 }}>
                {interest}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ── Colonne droite (Contenu principal haute élégance) ── */}
      <div style={{ flex: 1, padding: "28px 24px 24px 28px" }}>
        {/* En-tête : Nom & Prénom grand format éditorial */}
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: 400,
            fontFamily: "'Georgia', 'Playfair Display', serif",
            color: "#1c1917",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>
            {personal.firstName}
          </h1>
          <h1 style={{
            fontSize: "36px",
            fontWeight: 700,
            fontFamily: "'Georgia', 'Playfair Display', serif",
            color: "#1c1917",
            margin: "2px 0 0 0",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
          }}>
            {personal.lastName}
          </h1>
          {personal.title && (
            <p style={{
              fontSize: "13px",
              fontStyle: "italic",
              color: "#57534e",
              marginTop: "6px",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.3,
            }}>
              {personal.title}
            </p>
          )}
        </div>

        {/* Accroche / Résumé */}
        {personal.summary && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{
              fontSize: "10.5px",
              color: "#57534e",
              lineHeight: 1.6,
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {personal.summary}
            </p>
          </div>
        )}

        {/* Zone contenu avec ligne verticale d'axe */}
        <div style={{
          borderLeft: `1.5px solid ${accentHex}`,
          paddingLeft: "16px",
          marginLeft: "6px",
          position: "relative",
        }}>
          {/* Expériences */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <SectionHeader title="Expériences" accentHex={accentHex} />
              {experiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "14px" }}>
                  <p style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#1c1917",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    {exp.company}{" "}
                    <span style={{ fontWeight: 400, color: "#57534e" }}>
                      {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                    </span>
                  </p>
                  <p style={{
                    fontSize: "10.5px",
                    fontStyle: "italic",
                    color: accentHex,
                    margin: "2px 0 4px 0",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {exp.position}
                  </p>
                  {exp.description && (
                    <p style={{
                      fontSize: "10px",
                      color: "#57534e",
                      margin: "3px 0",
                      lineHeight: 1.5,
                      fontFamily: "system-ui, sans-serif",
                    }}>
                      {exp.description}
                    </p>
                  )}
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul style={{ margin: "3px 0 0 0", paddingLeft: "14px", fontFamily: "system-ui, sans-serif" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ fontSize: "10px", color: "#57534e", lineHeight: 1.5, marginBottom: "2px" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Formations */}
          {education.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <SectionHeader title="Formations" accentHex={accentHex} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "12px" }}>
                  <p style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#1c1917",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    {edu.school}{" "}
                    <span style={{ fontWeight: 400, color: "#57534e" }}>
                      {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                    </span>
                  </p>
                  <p style={{
                    fontSize: "10.5px",
                    fontStyle: "italic",
                    color: accentHex,
                    margin: "2px 0 0 0",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {edu.degree}
                    {edu.mention && <span style={{ color: "#78716c", fontStyle: "normal" }}> — {edu.mention}</span>}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Compétences — Badges / Pills ovales comme sur la photo */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <SectionHeader title="Compétences" accentHex={accentHex} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "#292524",
                      background: pillBg,
                      padding: "5px 14px",
                      borderRadius: "14px",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projets */}
          {projects.length > 0 && (
            <div>
              <SectionHeader title="Projets" accentHex={accentHex} />
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: "10px" }}>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#1c1917",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    {proj.title}
                    {proj.link && (
                      <span style={{ fontWeight: 400, color: accentHex, fontSize: "9.5px", marginLeft: "6px" }}>
                        ↗ {proj.link}
                      </span>
                    )}
                  </p>
                  {proj.description && (
                    <p style={{
                      fontSize: "10px",
                      color: "#57534e",
                      margin: "2px 0",
                      lineHeight: 1.4,
                      fontFamily: "system-ui, sans-serif",
                    }}>
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
