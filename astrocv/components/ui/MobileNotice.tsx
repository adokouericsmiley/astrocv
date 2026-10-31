"use client";
// ============================================================
// components/ui/MobileNotice.tsx
// Message d'avertissement lorsqu'un utilisateur consulte l'app sur mobile
// Indique que l'expérience éditeur + prévisualisation A4 nécessite un écran PC (≥1024px).
// ============================================================

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNotice() {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Détecte largeur < 1024px ou userAgent mobile
      const width = window.innerWidth;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(width < 1024 || isMobileUA);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-md text-white select-none"
      >
        {/* Cercles de fond lumineux */}
        <div className="absolute w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />
        <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative max-w-sm w-full bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-2xl text-center space-y-5"
        >
          {/* Logo & Icônes */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Smartphone size={24} />
            </div>
            <div className="text-indigo-400 font-extrabold text-lg">→</div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
                <Monitor size={28} className="text-teal-400" />
              </div>
            </div>
          </div>

          {/* Titre */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Info size={13} />
              Usage Desktop Requis
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              astro<span className="text-teal-400">CV</span> est conçu pour PC
            </h2>
          </div>

          {/* Message explicatif */}
          <p className="text-xs text-slate-300 leading-relaxed">
            Pour garantir un confort d'édition optimal avec le **double panneau** et la **prévisualisation A4 pixel-perfect en temps réel**, veuillez ouvrir **astroCV** depuis un ordinateur de bureau ou un écran ≥ 1024px.
          </p>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 text-[11px] text-slate-400">
              💻 <strong>Recommandé :</strong> Revenez depuis votre navigateur sur ordinateur.
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="w-full btn btn-sm btn-ghost text-xs text-slate-400 hover:text-white gap-1"
            >
              Aperçu limité sur mobile <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
