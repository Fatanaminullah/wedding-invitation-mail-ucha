"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ExternalLink, Heart } from "lucide-react";
import Anim from "@/components/global/anim";
import { Button } from "@/components/ui/button";

interface Translations {
  saveTheDate: {
    title: string;
    akad: {
      title: string;
      date: string;
      time: string;
    };
    resepsi: {
      title: string;
      date: string;
      time: string;
    };
    address: {
      title: string;
      location: {
        title: string;
        description: string;
        detail: string;
      };
      mapButton: string;
    };
    additionalInfo: string;
  };
}

export default function SaveTheDate() {
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

  // Google Maps URL for the venue
  const mapsUrl = "https://maps.app.goo.gl/csa2Zts1CJzHAFYH8";

  return (
    <section
      className="min-h-svh relative py-20 px-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/save-the-date.jpg')",
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto">
        <Anim className="block">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              {translations.saveTheDate.title}
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
          </div>
        </Anim>

        {/* Single Card */}
        <Anim delay={200} className="block">
          <div className="bg-gradient-to-br from-white to-stone-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            {/* Akad Nikah Section */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-stone-600 mb-2">
                  {translations.saveTheDate.akad.title}
                </h3>
                <div className="w-12 h-0.5 bg-stone-400 mx-auto opacity-60"></div>
              </div>

              <div className="space-y-3">
                {/* Akad Date */}
                <div className="flex items-start gap-3">
                  <Calendar
                    className="text-stone-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {translations.saveTheDate.akad.date}
                    </p>
                  </div>
                </div>

                {/* Akad Time */}
                <div className="flex items-start gap-3">
                  <Clock
                    className="text-stone-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {translations.saveTheDate.akad.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resepsi Section */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  {translations.saveTheDate.resepsi.title}
                </h3>
                <div className="w-12 h-0.5 bg-gray-400 mx-auto opacity-60"></div>
              </div>

              <div className="space-y-3">
                {/* Resepsi Date */}
                <div className="flex items-start gap-3">
                  <Calendar
                    className="text-gray-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {translations.saveTheDate.resepsi.date}
                    </p>
                  </div>
                </div>

                {/* Resepsi Time */}
                <div className="flex items-start gap-3">
                  <Clock
                    className="text-gray-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {translations.saveTheDate.resepsi.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Location */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {translations.saveTheDate.address.title}{" "}
                </h3>
                <div className="w-10 h-0.5 bg-gray-400 mx-auto opacity-60"></div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <MapPin
                  className="text-gray-600 mt-1 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-800 mb-1">
                    {translations.saveTheDate.address.location.title} <br />
                    ({translations.saveTheDate.address.location.description})
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {translations.saveTheDate.address.location.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Maps Button */}
            <div className="text-center">
              <Button
                onClick={() => window.open(mapsUrl, "_blank")}
                className="bg-stone-600 hover:bg-stone-700 text-white w-full"
              >
                <ExternalLink size={16} className="mr-2" />
                {translations.saveTheDate.address.mapButton}
              </Button>
            </div>
          </div>
        </Anim>
      </div>
    </section>
  );
}
