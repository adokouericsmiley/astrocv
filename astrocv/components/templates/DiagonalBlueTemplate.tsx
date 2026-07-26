"use client";
// ============================================================
// components/templates/DiagonalBlueTemplate.tsx
// Template "Diagonal Blue" (inspiré de l'image Raphaël Martin)
// - Forme géométrique diagonale d'accentuation en haut à gauche
// - Photo circulaire cerclée de blanc
// - Sidebar avec pilules/jauges de niveau pour les langues/compétences
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface DiagonalBlueTemplateProps {
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

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900">
        {title}
      </h2>
      <div className="w-full h-px bg-slate-300 mt-1" />
    </div>
  );
}

export default function DiagonalBlueTemplate({ data, accentHex }: DiagonalBlueTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  const fullAddress = [personal.address, personal.city, personal.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-[11px] text-slate-800 bg-white relative flex flex-col overflow-hidden">
      {/* ── Top Header Zone with Diagonal Geometry ── */}
      <div className="relative w-full h-[45mm] flex items-center bg-sky-50/50">
        {/* Polygon Diagonal Background Shape */}
        <div
          className="absolute inset-0 z-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
            backgroundColor: accentHex,
          }}
        />

        {/* Header content overlay */}
        <div className="relative z-10 w-full flex items-center justify-between px-8">
          {/* Avatar frame */}
          <div className="w-[68mm] flex justify-center shrink-0">
            {settings.showPhoto && personal.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={personal.photoUrl}
                alt={`${personal.firstName} ${personal.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-white font-bold text-xl">
                {personal.firstName?.[0]}
                {personal.lastName?.[0]}
              </div>
            )}
          </div>

          {/* Name & Title on top right */}
          <div className="flex-1 pl-6 text-slate-900">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {personal.firstName}{" "}
              <span className="font-extrabold uppercase">{personal.lastName}</span>
            </h1>
            {personal.title && (
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-700 mt-1">
                {personal.title}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Body (Sidebar + Content) ── */}
      <div className="flex flex-1">
        {/* ── Left Sidebar (Light blue/grey background) ── */}
        <div className="w-[68mm] bg-slate-50 p-6 border-r border-slate-200 space-y-6 shrink-0">
          {/* Contact */}
          <div>
            <SectionTitle title="CONTACT" />
            <div className="space-y-2 text-[10px] text-slate-700 mt-2">
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className="shrink-0" style={{ color: accentHex }} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0" style={{ color: accentHex }} />
                  <span className="break-all">{personal.email}</span>
                </div>
              )}
              {fullAddress && (
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="shrink-0 mt-0.5" style={{ color: accentHex }} />
                  <span className="break-words">{fullAddress}</span>
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

          {/* Langues avec pill progress bars */}
          {languages.length > 0 && (
            <div>
              <SectionTitle title="LANGUES" />
              <div className="space-y-2 mt-2">
                {languages.map((lang) => {
                  const getPercent = (lvl: string) => {
                    if (lvl === "Natif") return 100;
                    if (lvl === "C2") return 90;
                    if (lvl === "C1") return 80;
                    if (lvl === "B2") return 65;
                    if (lvl === "B1") return 50;
                    return 35;
                  };
                  const pct = getPercent(lang.level);
                  return (
                    <div key={lang.id} className="text-[10px]">
                      <div className="flex justify-between font-semibold text-slate-800 mb-0.5">
                        <span>{lang.name}</span>
                        <span className="text-slate-500 text-[9px]">{lang.level}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: accentHex }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compétences */}
          {skills.length > 0 && (
            <div>
              <SectionTitle title="COMPÉTENCES" />
              <ul className="space-y-1 text-[10px] text-slate-700 mt-2 list-disc list-inside">
                {skills.map((skill) => (
                  <li key={skill.id} className="font-medium">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Centres d'intérêt */}
          {interests.length > 0 && interests.some((i) => i.trim()) && (
            <div>
              <SectionTitle title="CENTRES D'INTÉRÊT" />
              <ul className="space-y-1 text-[10px] text-slate-700 mt-2 list-disc list-inside">
                {interests.filter(Boolean).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Main Content Right Column ── */}
        <div className="flex-1 p-6 space-y-6">
          {/* Summary section if present */}
          {personal.summary && (
            <div>
              <SectionTitle title="PROFIL" />
              <p className="text-[10px] text-slate-700 leading-relaxed mt-2 font-normal">
                {personal.summary}
              </p>
            </div>
          )}

          {settings.sectionOrder.map((sectionKey) => {
            if (sectionKey === "experiences" && experiences.length > 0) {
              return (
                <div key="experiences">
                  <SectionTitle title="EXPÉRIENCES PROFESSIONNELLES" />
                  <div className="space-y-4 mt-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="text-[10.5px]">
                        <div className="font-extrabold text-slate-900 text-[11.5px]">
                          {exp.position}
                        </div>
                        <div className="text-[10px] font-bold text-slate-700">
                          {exp.company}
                          {exp.location && ` | ${exp.location}`}
                          {" — "}
                          <span className="font-semibold text-slate-500">
                            {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                        )}
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-inside text-[10px] text-slate-600 mt-1 space-y-0.5">
                            {exp.bullets.filter(Boolean).map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (sectionKey === "education" && education.length > 0) {
              return (
                <div key="education">
                  <SectionTitle title="FORMATION" />
                  <div className="space-y-3 mt-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="text-[10.5px]">
                        <div className="font-extrabold text-slate-900 text-[11.5px]">
                          {edu.degree}
                        </div>
                        <div className="text-[10px] font-bold text-slate-700 italic">
                          {edu.school}
                          {edu.location && ` | ${edu.location}`}
                          {" — "}
                          <span className="font-semibold text-slate-500 not-italic">
                            {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                          </span>
                        </div>
                        {edu.mention && (
                          <div className="text-[9.5px] text-slate-500 italic">Mention : {edu.mention}</div>
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

            if (sectionKey === "projects" && projects.length > 0) {
              return (
                <div key="projects">
                  <SectionTitle title="PROJETS" />
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
    </div>
  );
}
