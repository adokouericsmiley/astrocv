"use client";
// ============================================================
// components/templates/ModernTemplate.tsx
// Template "Modern" avec Tailwind CSS v4
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod, groupSkillsByCategory } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

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
  accentHex: string;
}

function ContactItem({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 mb-1 text-slate-600">
      <Icon size={11} className="shrink-0 opacity-80" />
      <span className="text-[10px] break-all">{value}</span>
    </div>
  );
}

function SectionTitle({ title, accentHex }: { title: string; accentHex: string }) {
  return (
    <div className="mb-2 mt-3.5">
      <h2
        className="text-[12px] font-bold uppercase tracking-wider pb-1 border-b-2"
        style={{ color: accentHex, borderColor: accentHex }}
      >
        {title}
      </h2>
    </div>
  );
}

function SkillBar({ level, accentHex }: { level: number; accentHex: string }) {
  return (
    <div className="flex gap-1 mt-0.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 rounded-full"
          style={{ background: dot <= level ? accentHex : "#e2e8f0" }}
        />
      ))}
    </div>
  );
}

export default function ModernTemplate({ data, accentHex }: ModernTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;
  const skillGroups = groupSkillsByCategory(skills);

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-[11px] text-slate-800 flex flex-row bg-white">
      {/* ── Colonne gauche (sidebar) ── */}
      <div
        className="w-[68mm] min-h-[297mm] bg-slate-50 border-r-4 p-5 shrink-0"
        style={{ borderRightColor: accentHex }}
      >
        {/* Photo */}
        {settings.showPhoto && personal.photoUrl && (
          <div className="text-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-4 shadow-md mx-auto block"
              style={{ borderColor: accentHex }}
            />
          </div>
        )}

        {/* Nom */}
        <div className="mb-4">
          <h1 className="text-base font-extrabold uppercase leading-tight" style={{ color: accentHex }}>
            {personal.lastName}
          </h1>
          <h1 className="text-base font-extrabold text-slate-800 leading-tight">
            {personal.firstName}
          </h1>
          {personal.title && (
            <p className="text-[9.5px] text-slate-500 mt-1 italic leading-relaxed">
              {personal.title}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-4">
          <h3
            className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: accentHex }}
          >
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
          <div className="mb-4">
            <h3
              className="text-[9px] font-bold uppercase tracking-wider mb-2"
              style={{ color: accentHex }}
            >
              Compétences
            </h3>
            {Object.entries(skillGroups).map(([category, catSkills]) => (
              <div key={category} className="mb-2">
                <p className="text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                  {category}
                </p>
                {catSkills.map((skill) => (
                  <div key={skill.id} className="mb-1.5">
                    <span className="text-[10px] text-slate-700">{skill.name}</span>
                    <SkillBar level={skill.level} accentHex={accentHex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <div className="mb-4">
            <h3
              className="text-[9px] font-bold uppercase tracking-wider mb-2"
              style={{ color: accentHex }}
            >
              Langues
            </h3>
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-700">{lang.name}</span>
                <span
                  className="text-[9px] font-semibold text-white px-1.5 py-0.5 rounded-full"
                  style={{ background: accentHex }}
                >
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Centres d'intérêt */}
        {interests.length > 0 && (
          <div>
            <h3
              className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: accentHex }}
            >
              Intérêts
            </h3>
            <div className="flex flex-wrap gap-1">
              {interests.filter(Boolean).map((interest, i) => (
                <span key={i} className="text-[9px] text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Colonne droite (contenu principal) ── */}
      <div className="flex-1 p-5 pt-5">
        {/* Accroche */}
        {personal.summary && (
          <div className="bg-slate-50 border-l-4 p-2.5 rounded-r-md mb-2" style={{ borderLeftColor: accentHex }}>
            <p className="text-[10px] text-slate-600 leading-relaxed m-0">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Expériences */}
        {experiences.length > 0 && (
          <div>
            <SectionTitle title="Expériences professionnelles" accentHex={accentHex} />
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11.5px] font-bold text-slate-800 m-0">
                      {exp.position}
                    </p>
                    <p className="text-[10px] font-semibold m-0.5" style={{ color: accentHex }}>
                      {exp.company}
                      {exp.location && <span className="text-slate-500 font-normal"> · {exp.location}</span>}
                    </p>
                  </div>
                  <span className="text-[9.5px] text-slate-500 whitespace-nowrap ml-2 shrink-0">
                    {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-[10px] text-slate-600 my-1 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="m-0 pl-3.5 list-disc">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-[10px] text-slate-600 leading-relaxed mb-0.5">
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
              <div key={edu.id} className="mb-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 m-0">
                      {edu.degree}
                    </p>
                    <p className="text-[10px] font-semibold m-0.5" style={{ color: accentHex }}>
                      {edu.school}
                      {edu.location && <span className="text-slate-500 font-normal"> · {edu.location}</span>}
                    </p>
                    {edu.mention && (
                      <span className="text-[9px] text-slate-500 italic">{edu.mention}</span>
                    )}
                  </div>
                  <span className="text-[9.5px] text-slate-500 whitespace-nowrap ml-2 shrink-0">
                    {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
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
              <div key={proj.id} className="mb-2.5">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-bold text-slate-800 m-0">
                    {proj.title}
                  </p>
                  {proj.link && (
                    <span className="text-[9px]" style={{ color: accentHex }}>↗ {proj.link}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[10px] text-slate-600 my-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                )}
                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[8.5px] border px-1.5 py-0.5 rounded"
                        style={{ color: accentHex, borderColor: accentHex }}
                      >
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
