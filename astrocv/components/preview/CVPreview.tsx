"use client";
// ============================================================
// components/preview/CVPreview.tsx
// Panneau de prévisualisation A4 en temps réel.
// - Totalement découplé du formulaire (reçoit CVData en props)
// - Applique le bon template selon settings.templateId
// - Supporte un zoom pour tenir dans le panneau
// ============================================================

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CVData } from "@/lib/types";
import ModernTemplate from "@/components/templates/ModernTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import { ACCENT_HEX } from "@/components/templates";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface CVPreviewProps {
  data: CVData;
}

// forwardRef permet à react-to-print d'accéder au DOM de la preview
const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [zoom, setZoom] = useState(1); // zoom manuel additionnel

    // A4 = 794px à 96dpi (≈210mm)
    const A4_WIDTH = 794;

    // Calcul automatique du scale pour tenir dans le conteneur
    useEffect(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth - 48; // padding
        const newScale = Math.min(containerWidth / A4_WIDTH, 1);
        setScale(newScale);
      };
      updateScale();
      const observer = new ResizeObserver(updateScale);
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    const accentHex = ACCENT_HEX[data.settings.accentColor] ?? "#6366f1";

    // Rendu du template selon l'ID
    const renderTemplate = () => {
      switch (data.settings.templateId) {
        case "creative":
          return <CreativeTemplate data={data} accentHex={accentHex} />;
        case "modern":
        default:
          return <ModernTemplate data={data} accentHex={accentHex} />;
      }
    };

    const finalScale = scale * zoom;

    return (
      <div ref={containerRef} className="preview-panel">
        {/* Toolbar de la preview */}
        <div className="preview-toolbar no-print" style={{ width: `${A4_WIDTH * finalScale}px` }}>
          <span className="flex-1">
            Aperçu A4 — {Math.round(finalScale * 100)}%
          </span>
          {/* Contrôles zoom */}
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="p-1 hover:text-white transition-colors rounded"
            title="Zoom arrière"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="px-2 py-0.5 bg-white/10 rounded text-white hover:bg-white/20 transition-colors"
            title="Réinitialiser le zoom"
          >
            <Maximize2 size={12} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="p-1 hover:text-white transition-colors rounded"
            title="Zoom avant"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        {/* Feuille A4 zoomable */}
        <motion.div
          style={{
            transform: `scale(${finalScale})`,
            transformOrigin: "top center",
            // Compense la hauteur perdue par le scale
            marginBottom: `calc(${finalScale - 1} * 297mm)`,
          }}
          animate={{ scale: finalScale }}
          transition={{ duration: 0.1 }}
        >
          {/* ref transmis pour react-to-print */}
          <div ref={ref} className="cv-a4">
            <AnimatePresence mode="wait">
              <motion.div
                key={data.settings.templateId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderTemplate()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
