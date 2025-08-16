"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import Anim from "@/components/global/anim";
import { fadeInLeft, fadeInRight } from "@/lib/keyframes";

interface Translations {
  bride: {
    name: string;
    title: string;
    detail: string;
    instagram: string;
  };
  groom: {
    name: string;
    title: string;
    detail: string;
    instagram: string;
  };
}

// Image Carousel Component
interface ImageCarouselProps {
  images: string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-80 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
}

export default function BrideGroom() {
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
    <section className="min-h-svh bg-gradient-to-b from-stone-50 to-white py-20 px-6">
      <div className="max-w-md mx-auto">
        <Anim>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Bride & Groom
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
          </div>
        </Anim>

        {/* Bride Section */}
        <Anim delay={200} keyframes={fadeInRight}>
          <div className="mb-16">
            {/* Grid container for label and image */}
            <div className="grid grid-cols-6 items-center gap-4 mb-6">
              {/* The Bride Label */}
              <div className="-rotate-90 col-span-1">
                <span className="text-xl font-serif text-stone-400 tracking-[0.3em] whitespace-nowrap">
                  The Bride
                </span>
              </div>
              {/* Bride Image & Info */}
              <div className="col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <ImageCarousel
                    images={["/bride.jpg", "/gallery-4.jpg"]}
                    alt="Bride"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                    {translations.bride.name}
                  </h3>
                  <p className="text-stone-600 font-medium mb-3">
                    {translations.bride.title}
                  </p>
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: translations.bride.detail,
                    }}
                  ></div>
                  <a
                    href={`https://instagram.com/${translations.bride.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300"
                  >
                    <Instagram size={16} />
                    {translations.bride.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Anim>

        {/* Groom Section */}
        <Anim delay={600} keyframes={fadeInLeft}>
          <div>
            {/* Grid container for image and label */}
            <div className="grid grid-cols-6 items-center gap-4 mb-6">
              {/* Groom Image & Info */}
              <div className="col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <ImageCarousel
                    images={["/groom.jpg", "/gallery-2.jpg"]}
                    alt="Groom"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                    {translations.groom.name}
                  </h3>
                  <p className="text-stone-600 font-medium mb-3">
                    {translations.groom.title}
                  </p>
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: translations.groom.detail,
                    }}
                  ></div>
                  <a
                    href={`https://instagram.com/${translations.groom.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300"
                  >
                    <Instagram size={16} />
                    {translations.groom.instagram}
                  </a>
                </div>
              </div>

              {/* The Groom Label */}
              <div className="rotate-90 -translate-y-24 col-span-1">
                <span className="text-xl font-serif text-stone-400 tracking-[0.3em] whitespace-nowrap">
                  The Groom
                </span>
              </div>
            </div>
          </div>
        </Anim>
      </div>
    </section>
  );
}
