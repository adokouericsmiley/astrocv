// ============================================================
// lib/storageManager.ts — Gestionnaire de stockage des CVs
// Permet de sauvegarder, charger, dupliquer et supprimer
// plusieurs CVs dans le localStorage du navigateur.
// ============================================================

import { CVData } from "./types";

export interface SavedCV {
  id: string;
  name: string;
  updatedAt: string; // Timestamp ISO 8601
  data: CVData;
}

const STORAGE_KEY = "astrocv_saved_cvs";

/**
 * Récupère la liste de tous les CVs sauvegardés dans le localStorage.
 */
export function getSavedCVs(): SavedCV[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCV[];
  } catch (error) {
    console.error("Erreur lors de la lecture des CVs sauvegardés :", error);
    return [];
  }
}

/**
 * Enregistre la liste complète des CVs dans le localStorage.
 */
function persistSavedCVs(cvs: SavedCV[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans le localStorage :", error);
  }
}

/**
 * Sauvegarde un nouveau CV ou met à jour un CV existant.
 */
export function saveCV(name: string, data: CVData, existingId?: string): SavedCV {
  const cvs = getSavedCVs();
  const now = new Date().toISOString();
  
  if (existingId) {
    const index = cvs.findIndex((item) => item.id === existingId);
    if (index !== -1) {
      const updated: SavedCV = {
        ...cvs[index],
        name: name.trim() || cvs[index].name,
        updatedAt: now,
        data,
      };
      cvs[index] = updated;
      persistSavedCVs(cvs);
      return updated;
    }
  }

  // Création d'un nouveau CV sauvegardé
  const newCV: SavedCV = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    name: name.trim() || `${data.personal.firstName || "Mon"} ${data.personal.lastName || "CV"}`.trim(),
    updatedAt: now,
    data,
  };

  cvs.unshift(newCV); // Ajout au début
  persistSavedCVs(cvs);
  return newCV;
}

/**
 * Supprime un CV sauvegardé par son ID.
 */
export function deleteSavedCV(id: string): void {
  const cvs = getSavedCVs().filter((item) => item.id !== id);
  persistSavedCVs(cvs);
}

/**
 * Duplique un CV existant.
 */
export function duplicateSavedCV(id: string): SavedCV | null {
  const cvs = getSavedCVs();
  const target = cvs.find((item) => item.id === id);
  if (!target) return null;

  return saveCV(`${target.name} (Copie)`, target.data);
}
