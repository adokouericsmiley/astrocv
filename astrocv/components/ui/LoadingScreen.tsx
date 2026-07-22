"use client";
// ============================================================
// components/ui/LoadingScreen.tsx
// Écran de chargement / Splash Screen animé au démarrage de l'app
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initialisation d'astroCV...");

  useEffect(() => {
    // Simule une progression fluide au chargement
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText("Chargement des modèles de CV...");
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText("Mise en place de l'éditeur en temps réel...");
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText("Studio prêt !");
    }, 1300);

    const timer4 = setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none"
        >
          {/* Arrière-plan avec halo lumineux */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/30 to-teal-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Container central */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Logo animé */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 p-0.5 shadow-2xl shadow-indigo-500/30"
            >
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles size={32} className="text-teal-400 animate-spin" />
              </div>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-black tracking-tight text-white mb-1"
            >
              astro<span className="text-teal-400">CV</span>
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-slate-400 mb-8"
            >
              Créateur de CV d'exception & Export PDF Natif
            </motion.p>

            {/* Barre de progression */}
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden mb-3 p-0.5 border border-slate-700/50">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Statut */}
            <div className="flex items-center justify-between w-full text-[11px] font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                {progress === 100 ? (
                  <CheckCircle2 size={13} className="text-teal-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                )}
                {statusText}
              </span>
              <span className="font-mono font-bold text-slate-300">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
