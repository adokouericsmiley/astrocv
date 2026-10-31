"use client";
// ============================================================
// components/ui/SavedCVsModal.tsx
// Modal de gestion des CVs sauvegardés dans localStorage.
// Permet de sauvegarder le CV actuel, charger un CV existant,
// dupliquer, supprimer ou créer un nouveau CV.
// ============================================================

import { useState, useEffect } from "react";
import { useCVStore } from "@/lib/store";
import { defaultCVData } from "@/lib/defaultData";
import {
  getSavedCVs,
  saveCV,
  deleteSavedCV,
  duplicateSavedCV,
  SavedCV,
} from "@/lib/storageManager";
import { TEMPLATES } from "@/components/templates";
import {
  X,
  Save,
  FolderOpen,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  FileText,
  Clock,
  LayoutTemplate,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavedCVsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedCVsModal({ isOpen, onClose }: SavedCVsModalProps) {
  const { cv, resetCV } = useCVStore();
  const [savedList, setSavedList] = useState<SavedCV[]>([]);
  const [cvNameInput, setCvNameInput] = useState("");
  const [activeCVId, setActiveCVId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Recharge la liste des CVs au changement d'ouverture
  useEffect(() => {
    if (isOpen) {
      const list = getSavedCVs();
      setSavedList(list);
      
      // Nom par défaut pour la sauvegarde
      const defaultName = `${cv.personal.firstName || "Mon"} ${cv.personal.lastName || "CV"}`.trim();
      const jobTitle = cv.personal.title ? ` - ${cv.personal.title}` : "";
      setCvNameInput(`${defaultName}${jobTitle}`);
    }
  }, [isOpen, cv.personal.firstName, cv.personal.lastName, cv.personal.title]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sauvegarde le CV actuel dans localStorage
  const handleSaveCurrent = () => {
    const saved = saveCV(cvNameInput, cv, activeCVId || undefined);
    setActiveCVId(saved.id);
    setSavedList(getSavedCVs());
    showToast("CV sauvegardé avec succès dans LocalStorage !");
  };

  // Charge un CV sauvegardé dans le store Zustand
  const handleLoad = (item: SavedCV) => {
    useCVStore.setState({
      cv: { ...item.data, settings: { ...defaultCVData.settings, ...item.data.settings } },
    });
    setActiveCVId(item.id);
    showToast(`CV "${item.name}" chargé !`);
    onClose();
  };

  // Duplique un CV
  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateSavedCV(id);
    setSavedList(getSavedCVs());
    showToast("CV dupliqué !");
  };

  // Supprime un CV
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSavedCV(id);
    if (activeCVId === id) setActiveCVId(null);
    setSavedList(getSavedCVs());
    showToast("CV supprimé !");
  };

  // Créer un nouveau CV vierge
  const handleNewCV = () => {
    resetCV();
    setActiveCVId(null);
    showToast("Nouveau CV initialisé !");
    onClose();
  };

  const getTemplateName = (templateId: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId);
    return tmpl ? tmpl.name : templateId;
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Toast de confirmation */}
          {toastMessage && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-slate-700 animate-bounce">
              <CheckCircle size={14} className="text-teal-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600">
                <FolderOpen size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-base-content">
                  Mes CVs Sauvegardés (LocalStorage)
                </h3>
                <p className="text-xs text-base-content/60">
                  Enregistrez et gérez vos différentes versions de CV localement dans votre navigateur.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
            >
              <X size={18} />
            </button>
          </div>

          {/* Formulaire d'enregistrement du CV actuel */}
          <div className="p-5 border-b border-base-200 bg-base-200/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={cvNameInput}
                onChange={(e) => setCvNameInput(e.target.value)}
                placeholder="Nommez cette version de CV..."
                className="input input-sm input-bordered w-full pr-8 text-xs font-medium focus:input-primary"
              />
              <FileText size={14} className="absolute right-2.5 top-2.5 text-base-content/40" />
            </div>
            <button
              onClick={handleSaveCurrent}
              className="btn btn-sm btn-teal text-white bg-teal-600 hover:bg-teal-700 gap-1.5 text-xs font-semibold shrink-0"
            >
              <Save size={14} />
              Enregistrer le CV actuel
            </button>
          </div>

          {/* Liste des CVs enregistrés */}
          <div className="p-6 overflow-y-auto flex-1 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-base-content/70 uppercase tracking-wider">
                Vos CVs enregistrés ({savedList.length})
              </span>
              <button
                onClick={handleNewCV}
                className="btn btn-xs btn-outline border-base-300 gap-1 text-[11px]"
              >
                <Plus size={12} /> Créer un nouveau CV
              </button>
            </div>

            {savedList.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-base-200 rounded-xl p-6">
                <FileText size={36} className="mx-auto text-base-content/30 mb-2" />
                <p className="text-sm font-semibold text-base-content/70">
                  Aucun CV enregistré dans LocalStorage.
                </p>
                <p className="text-xs text-base-content/50 mt-1">
                  Donnez un nom ci-dessus et cliquez sur &quot;Enregistrer le CV actuel&quot;.
                </p>
              </div>
            ) : (
              savedList.map((item) => {
                const isActive = activeCVId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleLoad(item)}
                    className={`group cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "border-teal-500 bg-teal-500/5 shadow-sm"
                        : "border-base-200 hover:border-teal-500/50 hover:bg-base-200/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center text-teal-600 font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-base-content group-hover:text-teal-600 transition-colors flex items-center gap-2">
                          {item.name}
                          {isActive && (
                            <span className="badge badge-teal badge-sm text-[10px] font-bold bg-teal-600 text-white border-none">
                              Actif
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-base-content/60 mt-1">
                          <span className="flex items-center gap-1">
                            <LayoutTemplate size={12} /> {getTemplateName(item.data.settings.templateId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {formatDate(item.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDuplicate(item.id, e)}
                        className="btn btn-xs btn-ghost btn-circle text-base-content/60 hover:text-teal-600"
                        title="Dupliquer ce CV"
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="btn btn-xs btn-ghost btn-circle text-base-content/60 hover:text-error"
                        title="Supprimer ce CV"
                      >
                        <Trash2 size={13} />
                      </button>
                      <button
                        onClick={() => handleLoad(item)}
                        className="btn btn-xs btn-teal bg-teal-600 hover:bg-teal-700 text-white font-semibold ml-1"
                      >
                        Charger
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-base-200 bg-base-200/30 flex items-center justify-between text-xs text-base-content/60">
            <span className="flex items-center gap-1">
              <Info size={13} className="text-teal-500" />
              Vos CVs sont sauvegardés uniquement dans votre navigateur local.
            </span>
            <button onClick={onClose} className="btn btn-sm btn-ghost">
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
