"use client";
// ============================================================
// components/ui/AppHeader.tsx
// Barre de navigation principale de l'application AstroCV
// Contient : logo, sélecteur de thème, bouton export PDF,
// et bouton reset (avec confirmation)
// ============================================================

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useCVStore } from "@/lib/store";
import { getPdfFileName } from "@/lib/helpers";
import ThemeSelector from "./ThemeSelector";
import {
  FileDown,
  RotateCcw,
  Sparkles,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface AppHeaderProps {
  /** ref vers le composant CVPreview (pour react-to-print) */
  printRef: React.RefObject<HTMLDivElement | null>;
}

export default function AppHeader({ printRef }: AppHeaderProps) {
  const { cv, resetCV } = useCVStore();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const fileName = getPdfFileName(cv.personal.firstName, cv.personal.lastName);

  // ── Configuration react-to-print ────────────────────────────
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: fileName.replace(".pdf", ""),
    onBeforePrint: async () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  });

  const handleReset = () => {
    if (showResetConfirm) {
      resetCV();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      // Auto-annule après 3 secondes
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <header className="no-print flex items-center justify-between px-5 py-2.5 border-b border-base-300 bg-base-100 z-10 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
          <Sparkles size={14} className="text-white" />
        </div>
        <div>
          <span className="text-sm font-extrabold text-base-content tracking-tight">
            astro
            <span className="text-indigo-500">CV</span>
          </span>
          <span className="hidden ml-2 text-xs text-base-content/40">
            Créateur de CV professionnel
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Sélecteur de thème */}
        <ThemeSelector />

        {/* Reset */}
        <button
          onClick={handleReset}
          className={`btn btn-sm btn-ghost gap-1.5 text-xs ${
            showResetConfirm
              ? "text-error border border-error/30 bg-error/10"
              : "text-base-content/50 hover:text-base-content"
          }`}
          title="Réinitialiser le CV"
        >
          {showResetConfirm ? (
            <>
              <AlertTriangle size={13} />
              Confirmer reset ?
            </>
          ) : (
            <>
              <RotateCcw size={13} />
              Reset
            </>
          )}
        </button>

        {/* Export PDF */}
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="btn btn-sm btn-primary gap-2 text-xs font-semibold shadow-sm"
          id="export-pdf-btn"
        >
          {isPrinting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Export en cours…
            </>
          ) : (
            <>
              <FileDown size={14} />
              Exporter PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
}
