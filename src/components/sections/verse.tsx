"use client";

import { useState, useEffect } from "react";
import Anim from "@/components/global/anim";

interface Translations {
  verse: {
    text: string;
    source: string;
  };
}

export default function Verse() {
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
    <section className="bg-gradient-to-b from-white to-stone-50 flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Anim>
          {/* Verse Text */}
          <div className="mb-8">
            <blockquote className="text-lg md:text-xl leading-relaxed text-gray-700 font-serif italic mb-6">
              {translations.verse.text}
            </blockquote>

            <cite className="text-stone-700 font-medium text-base">
              — {translations.verse.source}
            </cite>
          </div>

          {/* Decorative Bottom */}
          <div className="mt-8">
            <div className="w-32 h-0.5 bg-stone-400 mx-auto mb-6"></div>
          </div>
        </Anim>
      </div>
    </section>
  );
}
