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
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { applyHiddenSections, getAccentHex, FONT_STACKS } from "@/lib/helpers";
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
    const PAGE_PX = 1122.5; // 297 mm
    const sheetRef = useRef<HTMLDivElement>(null);
    const [sheetH, setSheetH] = useState(PAGE_PX);

    // Hauteur réelle du CV (le contenu peut s'étendre sur plusieurs pages)
    useEffect(() => {
      const el = sheetRef.current;
      if (!el) return;
      const update = () => setSheetH(Math.max(PAGE_PX, el.offsetHeight));
      update();
      const observer = new ResizeObserver(update);
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

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

    const accentHex = getAccentHex(data.settings);
    const visibleData = applyHiddenSections(data);

    // Rendu du template selon l'ID (repli sur Modern si l'ID est inconnu)
    const Template = TEMPLATE_COMPONENTS[data.settings.templateId] ?? TEMPLATE_COMPONENTS.modern;
    const fontKey = data.settings.fontFamily;

    const finalScale = scale * zoom;
    const pages = Math.max(1, Math.ceil(sheetH / PAGE_PX - 0.02));

    return (
      <div ref={containerRef} className="preview-panel overflow-x-hidden">
        {/* Toolbar de la preview */}
        <div
          className="preview-toolbar no-print"
          style={{ width: `${Math.round(A4_WIDTH * finalScale)}px`, maxWidth: "100%" }}
        >
          <span className="flex-1">
            Aperçu A4 — {Math.round(finalScale * 100)}%{pages > 1 ? ` · ${pages} pages` : ""}
          </span>
          {/* Contrôles zoom */}
          <button
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
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
            onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(2)))}
            className="p-1 hover:text-white transition-colors rounded"
            title="Zoom avant"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        {/* Feuille A4 zoomable (plusieurs pages si le contenu dépasse) */}
        <div
          style={{
            height: `${sheetH * finalScale}px`,
            width: `${A4_WIDTH * finalScale}px`,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div
            ref={sheetRef}
            style={{ transform: `scale(${finalScale})`, transformOrigin: "top left", width: "210mm", position: "relative" }}
          >
            {/* ref transmis pour react-to-print */}
            <div
              ref={ref}
              className="cv-a4"
              data-font={fontKey && fontKey !== "default" ? fontKey : undefined}
              style={{
                transformOrigin: "top left",
                minHeight: `${pages * 297}mm`,
                ["--cv-font" as string]: FONT_STACKS[fontKey ?? "default"],
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.settings.templateId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Template data={visibleData} accentHex={accentHex} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Repères de saut de page (non imprimés) */}
            {Array.from({ length: pages - 1 }, (_, i) => (
              <div
                key={i}
                className="no-print"
                style={{
                  position: "absolute", left: 0, right: 0, top: `${(i + 1) * PAGE_PX}px`,
                  borderTop: "2px dashed #f43f5e", pointerEvents: "none",
                }}
              >
                <span style={{ position: "absolute", right: 6, top: 3, fontSize: 11, color: "#f43f5e", fontWeight: 700 }}>
                  Page {i + 2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
