"use client";
// ============================================================
// app/page.tsx — Page principale de l'application AstroCV
// ⚠️ "use client" obligatoire : utilise useRef, useEffect, hooks Zustand
// Layout desktop 2 panneaux : Éditeur (gauche) + Preview (droite)
// Client Component car il orchestre le store et le ref pour print
// ============================================================

import { useRef, useEffect } from "react";
import { useCVStore } from "@/lib/store";
import CVEditor from "@/components/editor/CVEditor";
import CVPreview from "@/components/preview/CVPreview";
import AppHeader from "@/components/ui/AppHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MobileNotice from "@/components/ui/MobileNotice";

export default function HomePage() {
  const { cv } = useCVStore();

  // ref transmis à CVPreview (forwardRef) puis à AppHeader pour react-to-print
  const printRef = useRef<HTMLDivElement>(null);

  // Initialise le thème daisyUI depuis le store au montage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", cv.settings.daisyTheme);
  }, [cv.settings.daisyTheme]);

  return (
    <div className="app-root">
      {/* Avertissement mobile / petit écran */}
      <MobileNotice />

      {/* Écran de chargement / Splash Screen au démarrage */}
      <LoadingScreen />

      {/* Header global */}
      <AppHeader printRef={printRef} />

      {/* Corps : éditeur + preview côte à côte */}
      <div className="app-body">
        {/* Panneau éditeur */}
        <CVEditor />

        {/* Panneau preview A4 */}
        <CVPreview ref={printRef} data={cv} />
      </div>
    </div>
  );
}
