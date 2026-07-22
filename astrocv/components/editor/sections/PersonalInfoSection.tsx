"use client";
// ============================================================
// components/editor/sections/PersonalInfoSection.tsx
// Section "Informations personnelles" du formulaire éditeur
// Inclut l'upload de photo de profil (fichier local ou URL)
// avec option pour afficher/masquer la photo sur le CV.
// ============================================================

import { useCVStore } from "@/lib/store";
import { Upload, Trash2, Camera, User, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { useRef } from "react";

export default function PersonalInfoSection() {
  const { cv, updatePersonal, updateSettings } = useCVStore();
  const p = cv.personal;
  const showPhoto = cv.settings.showPhoto;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const field = (
    label: string,
    key: keyof typeof p,
    placeholder?: string,
    type = "text"
  ) => (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        className="field-input"
        placeholder={placeholder ?? label}
        value={(p[key] as string) ?? ""}
        onChange={(e) => updatePersonal({ [key]: e.target.value })}
      />
    </div>
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 5 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updatePersonal({ photoUrl: base64String });
        updateSettings({ showPhoto: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonal({ photoUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* ── Photo de profil ── */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="field-label mb-0 font-bold text-slate-700 flex items-center gap-1.5">
            <Camera size={14} className="text-indigo-600" />
            Photo de profil
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            <input
              type="checkbox"
              className="checkbox checkbox-xs checkbox-primary"
              checked={showPhoto}
              onChange={(e) => updateSettings({ showPhoto: e.target.checked })}
            />
            <span>Afficher sur le CV</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          {/* Preview circle */}
          <div className="relative group shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-white shadow-sm flex items-center justify-center">
              {p.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={p.photoUrl}
                  alt="Aperçu photo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={28} className="text-slate-300" />
              )}
            </div>
            {p.photoUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                title="Supprimer la photo"
              >
                <Trash2 size={11} />
              </button>
            )}
          </div>

          {/* Upload actions */}
          <div className="flex-1 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload-input"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-sm btn-outline btn-primary gap-1.5 text-xs font-semibold"
              >
                <Upload size={13} />
                Uploader une photo
              </button>

              {p.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 text-xs gap-1"
                >
                  <Trash2 size={13} />
                  Supprimer
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Format JPG, PNG ou WEBP (max 5 Mo)
            </p>
          </div>
        </div>

        {/* Option URL alternative */}
        <div className="pt-2 border-t border-slate-200/60">
          <label className="field-label text-[11px] text-slate-500">
            Ou coller une URL d'image directe :
          </label>
          <input
            type="url"
            className="field-input text-xs"
            placeholder="https://exemple.com/ma-photo.jpg"
            value={p.photoUrl}
            onChange={(e) => {
              updatePersonal({ photoUrl: e.target.value });
              if (e.target.value) updateSettings({ showPhoto: true });
            }}
          />
        </div>
      </div>

      {/* Nom & Prénom */}
      <div className="field-group">
        {field("Nom", "lastName", "Martin")}
        {field("Prénom", "firstName", "Sophie")}
      </div>

      {/* Titre professionnel */}
      <div className="field-group full">
        {field("Titre professionnel", "title", "Ex : Développeur Full-Stack Senior")}
      </div>

      {/* Contact */}
      <div className="field-group">
        {field("Email", "email", "vous@exemple.com", "email")}
        {field("Téléphone", "phone", "+33 6 12 34 56 78", "tel")}
      </div>

      {/* Adresse */}
      <div className="field-group">
        {field("Adresse", "address", "12 Rue de la Paix")}
        {field("Ville", "city", "Paris")}
      </div>

      <div className="field-group">
        {field("Pays", "country", "France")}
        <div /> {/* spacer */}
      </div>

      {/* Liens */}
      <div className="field-group">
        {field("LinkedIn", "linkedin", "linkedin.com/in/prenom")}
        {field("GitHub", "github", "github.com/prenom")}
      </div>

      <div className="field-group full">
        {field("Site web", "website", "monsite.dev")}
      </div>

      {/* Résumé */}
      <div>
        <label className="field-label">Accroche / Résumé</label>
        <textarea
          className="field-input textarea"
          placeholder="Décrivez votre profil professionnel en 2-3 phrases..."
          value={p.summary}
          rows={4}
          onChange={(e) => updatePersonal({ summary: e.target.value })}
        />
      </div>
    </div>
  );
}
