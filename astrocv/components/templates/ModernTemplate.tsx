"use client";
// ============================================================
// components/templates/ModernTemplate.tsx
// Template "Modern" — design épuré avec bande colorée gauche,
// colonnes asymétriques. Le seul composant à styler pour le PDF.
// Toutes les unités sont en mm/pt pour un rendu A4 fidèle.
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod, groupSkillsByCategory } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

// SVG inline pour les icônes brand (retirées de lucide-react v1)
const LinkedinIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);
const GithubIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ModernTemplateProps {
  data: CVData;
  /** Couleur accent sous forme HEX (ex: #6366f1) */
  accentHex: string;
}

// ── Composant icône inline contact ──────────────────────────
function ContactItem({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
      <Icon size={11} style={{ flexShrink: 0, opacity: 0.8 }} />
      <span style={{ fontSize: "10px", wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

// ── Barre de séparation de section ──────────────────────────
function SectionTitle({ title, accentHex }: { title: string; accentHex: string }) {
  return (
    <div style={{ marginBottom: "8px", marginTop: "14px" }}>
      <h2 style={{
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: accentHex,
        margin: 0,
        paddingBottom: "4px",
        borderBottom: `2px solid ${accentHex}`,
      }}>
        {title}
      </h2>
    </div>
  );
}

// ── Barre de niveau compétence ───────────────────────────────
function SkillBar({ level, accentHex }: { level: number; accentHex: string }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginTop: "2px" }}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: dot <= level ? accentHex : "#e2e8f0",
          }}
        />
      ))}
    </div>
  );
}

export default function ModernTemplate({ data, accentHex }: ModernTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;
  const skillGroups = groupSkillsByCategory(skills);

  // Couleur sidebar (version très claire de l'accent)
  const sidebarBg = "#f8fafc";
  const sidebarBorderColor = accentHex;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "11px",
        color: "#1e293b",
        display: "flex",
        flexDirection: "row",
        background: "#fff",
      }}
    >
      {/* ── Colonne gauche (sidebar) ── */}
      <div
        style={{
          width: "68mm",
          minHeight: "297mm",
          background: sidebarBg,
          borderRight: `3px solid ${sidebarBorderColor}`,
          padding: "20px 14px",
          flexShrink: 0,
        }}
      >
        {/* Photo */}
        {settings.showPhoto && personal.photoUrl && (
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${accentHex}`,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Nom */}
        <div style={{ marginBottom: "16px" }}>
          <h1 style={{ fontSize: "16px", fontWeight: 800, color: accentHex, margin: 0, lineHeight: 1.2 }}>
            {personal.firstName}
          </h1>
          <h1 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b", margin: 0, lineHeight: 1.2 }}>
            {personal.lastName}
          </h1>
          {personal.title && (
            <p style={{ fontSize: "9.5px", color: "#64748b", marginTop: "4px", fontStyle: "italic", lineHeight: 1.4 }}>
              {personal.title}
            </p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "16px", color: "#475569" }}>
          <h3 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: accentHex, marginBottom: "6px" }}>
            Contact
          </h3>
          <ContactItem icon={Mail} value={personal.email} />
          <ContactItem icon={Phone} value={personal.phone} />
          {(personal.city || personal.country) && (
            <ContactItem icon={MapPin} value={[personal.city, personal.country].filter(Boolean).join(", ")} />
          )}
          <ContactItem icon={LinkedinIcon} value={personal.linkedin} />
          <ContactItem icon={GithubIcon} value={personal.github} />
          <ContactItem icon={Globe} value={personal.website} />
        </div>

        {/* Compétences */}
        {skills.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: accentHex, marginBottom: "8px" }}>
              Compétences
            </h3>
            {Object.entries(skillGroups).map(([category, catSkills]) => (
              <div key={category} style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "9px", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {category}
                </p>
                {catSkills.map((skill) => (
                  <div key={skill.id} style={{ marginBottom: "5px" }}>
                    <span style={{ fontSize: "10px", color: "#334155" }}>{skill.name}</span>
                    <SkillBar level={skill.level} accentHex={accentHex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: accentHex, marginBottom: "8px" }}>
              Langues
            </h3>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#334155" }}>{lang.name}</span>
                <span style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "#fff",
                  background: accentHex,
                  padding: "1px 5px",
                  borderRadius: "10px",
                }}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Centres d'intérêt */}
        {interests.length > 0 && (
          <div>
            <h3 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: accentHex, marginBottom: "6px" }}>
              Intérêts
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {interests.filter(Boolean).map((interest, i) => (
                <span key={i} style={{
                  fontSize: "9px",
                  color: "#475569",
                  background: "#e2e8f0",
                  padding: "2px 7px",
                  borderRadius: "10px",
                }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Colonne droite (contenu principal) ── */}
      <div style={{ flex: 1, padding: "20px 18px 20px 16px" }}>
        {/* Accroche */}
        {personal.summary && (
          <div style={{
            background: "#f8fafc",
            borderLeft: `3px solid ${accentHex}`,
            padding: "8px 10px",
            borderRadius: "0 6px 6px 0",
            marginBottom: "4px",
          }}>
            <p style={{ fontSize: "10px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
              {personal.summary}
            </p>
          </div>
        )}

        {/* Expériences */}
        {experiences.length > 0 && (
          <div>
            <SectionTitle title="Expériences professionnelles" accentHex={accentHex} />
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "11.5px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                      {exp.position}
                    </p>
                    <p style={{ fontSize: "10px", color: accentHex, fontWeight: 600, margin: "1px 0" }}>
                      {exp.company}
                      {exp.location && <span style={{ color: "#64748b", fontWeight: 400 }}> · {exp.location}</span>}
                    </p>
                  </div>
                  <span style={{ fontSize: "9.5px", color: "#64748b", whiteSpace: "nowrap", marginLeft: "8px", flexShrink: 0 }}>
                    {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ fontSize: "10px", color: "#475569", margin: "4px 0 3px", lineHeight: 1.5 }}>
                    {exp.description}
                  </p>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: "3px 0 0 0", paddingLeft: "14px" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ fontSize: "10px", color: "#475569", lineHeight: 1.5, marginBottom: "2px" }}>
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
          <div>
            <SectionTitle title="Formations" accentHex={accentHex} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                      {edu.degree}
                    </p>
                    <p style={{ fontSize: "10px", color: accentHex, fontWeight: 600, margin: "1px 0" }}>
                      {edu.school}
                      {edu.location && <span style={{ color: "#64748b", fontWeight: 400 }}> · {edu.location}</span>}
                    </p>
                    {edu.mention && (
                      <span style={{ fontSize: "9px", color: "#64748b", fontStyle: "italic" }}>{edu.mention}</span>
                    )}
                  </div>
                  <span style={{ fontSize: "9.5px", color: "#64748b", whiteSpace: "nowrap", marginLeft: "8px", flexShrink: 0 }}>
                    {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                  </span>
                </div>
                {edu.description && (
                  <p style={{ fontSize: "10px", color: "#475569", margin: "3px 0 0", lineHeight: 1.5 }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projets */}
        {projects.length > 0 && (
          <div>
            <SectionTitle title="Projets" accentHex={accentHex} />
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                    {proj.title}
                  </p>
                  {proj.link && (
                    <span style={{ fontSize: "9px", color: accentHex }}>↗ {proj.link}</span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ fontSize: "10px", color: "#475569", margin: "2px 0", lineHeight: 1.5 }}>
                    {proj.description}
                  </p>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "3px" }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={{
                        fontSize: "8.5px",
                        color: accentHex,
                        border: `1px solid ${accentHex}`,
                        padding: "1px 5px",
                        borderRadius: "4px",
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
