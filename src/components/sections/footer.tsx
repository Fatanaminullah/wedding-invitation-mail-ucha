"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Anim from "@/components/global/anim";

interface Translations {
  footer: {
    message: string;
    signature: string;
    names: string;
  };
}

export default function Footer() {
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const locale = localStorage.getItem("locale") || "id";
      try {
        const translationModule = await import(
          `../../../messages/${locale}.json`
        );
        setTranslations(translationModule.default);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to Indonesian
        const fallbackModule = await import("../../../messages/id.json");
        setTranslations(fallbackModule.default);
      }
    };

    loadTranslations();

    // Listen for language changes
    const handleStorageChange = () => {
      loadTranslations();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!translations) {
    return (
      <div className="min-h-svh bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <footer className="sticky bottom-0 -z-10 min-h-svh bg-gradient-to-b from-gray-50 to-stone-50 flex items-end justify-center py-20 px-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/footer.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <Anim className="block">
          {/* Main Message */}
          <div className="mb-12">
            <Anim delay={200} className="block">
              <p className="text-lg md:text-xl leading-relaxed text-white mb-8 font-light drop-shadow-lg">
                {translations.footer.message}
              </p>
            </Anim>
          </div>

          {/* Signature */}
          <div className="mb-12">
            <Anim delay={400} className="block">
              <div className="space-y-4 font-serif">
                <p className="text-base text-white/90 italic drop-shadow-md">
                  {translations.footer.signature}
                </p>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent drop-shadow-lg">
                  {translations.footer.names}
                </div>
              </div>
            </Anim>
          </div>

          {/* Bottom Decoration */}
          <div>
            <Anim delay={1000} className="block">
              <div className="space-y-4">
                <div className="w-24 h-0.5 bg-white/60 mx-auto"></div>
                <p className="text-xs text-white/70 tracking-wider drop-shadow-sm">
                  {new Date().getFullYear()} • Ucha & Ismail Wedding
                </p>
              </div>
            </Anim>
          </div>
        </Anim>
      </div>
    </footer>
  );
}
