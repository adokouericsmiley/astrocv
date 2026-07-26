"use client";
// ============================================================
// components/templates/ExecutiveNavyTemplate.tsx
// Template "Executive Navy" (inspiré de l'image Thomas Garcia)
// - Sidebar bleu nuit sombre avec photo en haut à gauche
// - Titres avec courtes barres d'accentuation en-dessous
// - Section compétences/langues à 2 colonnes
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe, Car, Trophy, Sparkles } from "lucide-react";

interface ExecutiveNavyTemplateProps {
  data: CVData;
  accentHex: string;
}

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

export default function ExecutiveNavyTemplate({ data, accentHex }: ExecutiveNavyTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  const fullAddress = [personal.address, personal.city, personal.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-[11px] text-slate-800 flex flex-row bg-white">
      {/* ── Sidebar gauche bleu nuit ── */}
      <div className="w-[72mm] min-h-[297mm] bg-[#1b2535] text-slate-100 flex flex-col shrink-0">
        {/* Photo en haut */}
        {settings.showPhoto && personal.photoUrl ? (
          <div className="w-full h-[72mm] overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="w-full h-16 bg-[#17202e]" />
        )}

        <div className="p-6 space-y-6 flex-1">
          {/* Section Profil */}
          {personal.summary && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                PROFIL
              </h3>
              <div className="w-8 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
              <p className="text-[10px] text-slate-300 leading-relaxed mt-2 font-normal">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Section Contact */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
              CONTACT
            </h3>
            <div className="w-8 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
            <div className="space-y-2 mt-3 text-[10px] text-slate-300">
              {fullAddress && (
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="shrink-0 mt-0.5" style={{ color: accentHex }} />
                  <span className="break-words">{fullAddress}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0" style={{ color: accentHex }} />
                  <span className="break-all">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className="shrink-0" style={{ color: accentHex }} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe size={12} className="shrink-0" style={{ color: accentHex }} />
                  <span className="break-all">{personal.website}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <div style={{ color: accentHex }} className="shrink-0">
                    <LinkedinIcon size={12} />
                  </div>
                  <span className="break-all">{personal.linkedin}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-2">
                  <div style={{ color: accentHex }} className="shrink-0">
                    <GithubIcon size={12} />
                  </div>
                  <span className="break-all">{personal.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section Centres d'intérêt */}
          {interests && interests.length > 0 && interests.some((i) => i.trim()) && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                INTÉRÊTS
              </h3>
              <div className="w-8 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
              <ul className="space-y-1.5 mt-3 text-[10px] text-slate-300">
                {interests.filter(Boolean).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Colonne principale droite ── */}
      <div className="flex-1 p-8 text-slate-800 space-y-6">
        {/* En-tête (Nom & Prénom + Titre) */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            {personal.firstName} <span className="font-light">{personal.lastName}</span>
          </h1>
          {personal.title && (
            <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-slate-500 mt-1">
              {personal.title}
            </p>
          )}
        </div>

        {/* Dynamic section rendering based on sectionOrder */}
        {settings.sectionOrder.map((sectionKey) => {
          if (sectionKey === "education" && education.length > 0) {
            return (
              <div key="education">
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-900">
                  FORMATION
                </h2>
                <div className="w-10 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
                <div className="space-y-3 mt-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-[10.5px]">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-slate-800">
                          {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                          {" — "}
                          {edu.degree}
                        </span>
                        {edu.location && <span className="text-slate-500 text-[10px]">{edu.location}</span>}
                      </div>
                      <div className="text-slate-600 font-medium">{edu.school}</div>
                      {edu.mention && (
                        <div className="text-[9.5px] italic text-slate-500">Mention : {edu.mention}</div>
                      )}
                      {edu.description && (
                        <p className="text-[10px] text-slate-600 mt-0.5">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (sectionKey === "experiences" && experiences.length > 0) {
            return (
              <div key="experiences">
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-900">
                  EXPÉRIENCE
                </h2>
                <div className="w-10 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
                <div className="space-y-4 mt-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-3 text-[10.5px]">
                      <div className="col-span-4 text-[10px] text-slate-500">
                        <div className="font-semibold text-slate-700">
                          {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                        </div>
                        <div className="font-medium text-slate-600">{exp.company}</div>
                        {exp.location && <div>{exp.location}</div>}
                      </div>
                      <div className="col-span-8 space-y-1">
                        <div className="font-extrabold uppercase text-slate-900 text-[11px]">
                          {exp.position}
                        </div>
                        {exp.description && (
                          <p className="text-[10px] text-slate-600 leading-relaxed">{exp.description}</p>
                        )}
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5">
                            {exp.bullets.filter(Boolean).map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if ((sectionKey === "skills" || sectionKey === "languages") && (skills.length > 0 || languages.length > 0)) {
            // Unify skills and languages in COMPÉTENCES section like Image 1
            if (sectionKey === "skills") {
              return (
                <div key="skills-languages">
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-900">
                    COMPÉTENCES
                  </h2>
                  <div className="w-10 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
                  <div className="grid grid-cols-2 gap-6 mt-3">
                    {/* Colonne Langues */}
                    {languages.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase text-slate-700 mb-2">LANGUES</h4>
                        <div className="space-y-1 text-[10px]">
                          {languages.map((lang) => (
                            <div key={lang.id} className="flex justify-between border-b border-slate-100 pb-0.5">
                              <span className="font-semibold text-slate-800">{lang.name}</span>
                              <span className="text-slate-500">{lang.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Colonne Compétences */}
                    {skills.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase text-slate-700 mb-2">LOGICIELS & SAVOIR-FAIRE</h4>
                        <div className="space-y-1 text-[10px]">
                          {skills.map((skill) => (
                            <div key={skill.id} className="flex justify-between border-b border-slate-100 pb-0.5">
                              <span className="font-semibold text-slate-800">{skill.name}</span>
                              <div className="flex gap-1 items-center">
                                {[1, 2, 3, 4, 5].map((dot) => (
                                  <span
                                    key={dot}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: dot <= skill.level ? accentHex : "#cbd5e1" }}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null; // languages handled inside skills block
          }

          if (sectionKey === "projects" && projects.length > 0) {
            return (
              <div key="projects">
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-900">
                  PROJETS
                </h2>
                <div className="w-10 h-1 my-1.5 rounded" style={{ backgroundColor: accentHex }} />
                <div className="space-y-3 mt-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="text-[10.5px]">
                      <div className="font-bold text-slate-900">{proj.title}</div>
                      {proj.description && <p className="text-[10px] text-slate-600">{proj.description}</p>}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.technologies.map((tech, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 text-[9px] px-1.5 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
