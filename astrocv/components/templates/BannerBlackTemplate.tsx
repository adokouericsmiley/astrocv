"use client";
// ============================================================
// components/templates/BannerBlackTemplate.tsx
// Template "Banner Black" (inspiré de l'image Nom Prénom)
// - En-tête avec bandeau bleu ciel / clair
// - Titres de sections dans des bannières noires/sombre à texte blanc
// - Layout clair à 2 colonnes avec dates alignées à gauche
// ============================================================

import { CVData } from "@/lib/types";
import { formatPeriod } from "@/lib/helpers";
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User } from "lucide-react";

interface BannerBlackTemplateProps {
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

function BlackBannerHeader({ title, icon: Icon }: { title: string; icon?: React.ElementType }) {
  return (
    <div className="bg-slate-900 text-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider mb-3 flex items-center gap-2">
      {Icon && <Icon size={14} className="shrink-0 text-slate-300" />}
      <span>{title}</span>
    </div>
  );
}

export default function BannerBlackTemplate({ data, accentHex }: BannerBlackTemplateProps) {
  const { personal, experiences, education, skills, languages, projects, interests, settings } = data;

  const fullAddress = [personal.address, personal.city, personal.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-[11px] text-slate-800 bg-white flex flex-col">
      {/* ── Top Header Banner ── */}
      <div className="flex w-full h-[38mm]">
        {/* Photo container top left */}
        <div className="w-[68mm] h-full flex items-center justify-center p-4 bg-slate-50 border-r border-slate-200">
          {settings.showPhoto && personal.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              className="h-[30mm] w-[30mm] object-cover rounded shadow-sm border border-slate-300"
            />
          ) : (
            <div className="h-[28mm] w-[28mm] rounded bg-slate-200 flex items-center justify-center text-slate-400">
              <User size={32} />
            </div>
          )}
        </div>

        {/* Right header with light accent background */}
        <div
          className="flex-1 p-6 flex flex-col justify-center border-b border-slate-200"
          style={{ backgroundColor: `${accentHex}12` }} // subtle 7% opacity tint of accent color
        >
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-wider uppercase">
            {personal.firstName} {personal.lastName}
          </h1>
          {personal.title && (
            <p className="text-[13px] italic font-semibold text-slate-700 tracking-wide mt-1">
              {personal.title}
            </p>
          )}
          <div className="w-full h-0.5 bg-slate-900 mt-2" />
        </div>
      </div>

      {/* ── Body 2 Columns ── */}
      <div className="flex flex-1">
        {/* ── Left Sidebar (68mm) ── */}
        <div className="w-[68mm] p-5 bg-white border-r border-slate-200 space-y-5 shrink-0">
          {/* Section Profil si remplie */}
          {personal.summary && (
            <div>
              <BlackBannerHeader title="PROFIL" />
              <p className="text-[10px] text-slate-600 leading-relaxed px-1">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Contact */}
          <div>
            <BlackBannerHeader title="CONTACT" />
            <div className="space-y-2 text-[10px] text-slate-700 px-1">
              {fullAddress && (
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="shrink-0 mt-0.5 text-slate-500" />
                  <div>
                    <div className="font-bold text-[9px] uppercase text-slate-400">ADRESSE</div>
                    <div className="break-words">{fullAddress}</div>
                  </div>
                </div>
              )}
              {personal.email && (
                <div className="flex items-start gap-2">
                  <Mail size={12} className="shrink-0 mt-0.5 text-slate-500" />
                  <div>
                    <div className="font-bold text-[9px] uppercase text-slate-400">E-MAIL</div>
                    <div className="break-all">{personal.email}</div>
                  </div>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-start gap-2">
                  <Phone size={12} className="shrink-0 mt-0.5 text-slate-500" />
                  <div>
                    <div className="font-bold text-[9px] uppercase text-slate-400">TÉLÉPHONE</div>
                    <div>{personal.phone}</div>
                  </div>
                </div>
              )}
              {personal.website && (
                <div className="flex items-start gap-2">
                  <Globe size={12} className="shrink-0 mt-0.5 text-slate-500" />
                  <div>
                    <div className="font-bold text-[9px] uppercase text-slate-400">SITE WEB</div>
                    <div className="break-all">{personal.website}</div>
                  </div>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-start gap-2">
                  <div className="shrink-0 mt-0.5 text-slate-500">
                    <LinkedinIcon size={12} />
                  </div>
                  <div>
                    <div className="font-bold text-[9px] uppercase text-slate-400">LINKEDIN</div>
                    <div className="break-all">{personal.linkedin}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compétences */}
          {skills.length > 0 && (
            <div>
              <BlackBannerHeader title="COMPÉTENCES" />
              <ul className="space-y-1 text-[10px] text-slate-700 px-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex justify-between items-center border-b border-slate-100 pb-0.5">
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <div>
              <BlackBannerHeader title="LANGUES" />
              <ul className="space-y-1 text-[10px] text-slate-700 px-1">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between items-center border-b border-slate-100 pb-0.5">
                    <span>{lang.name}</span>
                    <span className="text-slate-500 text-[9.5px]">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Loisirs / Intérêts */}
          {interests.length > 0 && interests.some((i) => i.trim()) && (
            <div>
              <BlackBannerHeader title="LOISIRS" />
              <ul className="space-y-1 text-[10px] text-slate-700 px-1">
                {interests.filter(Boolean).map((item, idx) => (
                  <li key={idx} className="border-b border-slate-100 pb-0.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Main Content Right Column ── */}
        <div className="flex-1 p-6 space-y-6">
          {settings.sectionOrder.map((sectionKey) => {
            if (sectionKey === "experiences" && experiences.length > 0) {
              return (
                <div key="experiences">
                  <BlackBannerHeader title="EXPÉRIENCES PROFESSIONNELLES" icon={Briefcase} />
                  <div className="space-y-4 mt-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-12 gap-3 text-[10.5px]">
                        <div className="col-span-4 text-[10px] text-slate-500 font-medium">
                          {formatPeriod(exp.startMonth, exp.endMonth, exp.current)}
                        </div>
                        <div className="col-span-8 space-y-1">
                          <div className="font-extrabold text-slate-900 text-[11px] uppercase">
                            {exp.position} {exp.company && <span className="font-semibold text-slate-700">- {exp.company}</span>}
                          </div>
                          {exp.location && (
                            <div className="text-[9.5px] text-slate-400 italic">{exp.location}</div>
                          )}
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

            if (sectionKey === "education" && education.length > 0) {
              return (
                <div key="education">
                  <BlackBannerHeader title="FORMATIONS" icon={GraduationCap} />
                  <div className="space-y-3 mt-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="grid grid-cols-12 gap-3 text-[10.5px]">
                        <div className="col-span-4 text-[10px] text-slate-500 font-medium">
                          {formatPeriod(edu.startMonth, edu.endMonth, edu.current)}
                        </div>
                        <div className="col-span-8 space-y-0.5">
                          <div className="font-extrabold text-slate-900 text-[11px] uppercase">
                            {edu.degree}
                          </div>
                          <div className="font-semibold text-slate-700 uppercase text-[10px]">
                            {edu.school} {edu.location && <span className="normal-case text-slate-500">({edu.location})</span>}
                          </div>
                          {edu.mention && (
                            <div className="text-[9.5px] text-slate-500 italic">Mention : {edu.mention}</div>
                          )}
                          {edu.description && (
                            <p className="text-[10px] text-slate-600 mt-1">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (sectionKey === "projects" && projects.length > 0) {
              return (
                <div key="projects">
                  <BlackBannerHeader title="PROJETS" />
                  <div className="space-y-3 mt-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="text-[10.5px]">
                        <div className="font-extrabold text-slate-900">{proj.title}</div>
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
