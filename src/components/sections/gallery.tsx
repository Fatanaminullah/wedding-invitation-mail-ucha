"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Anim from "@/components/global/anim";
import { slideInUp } from "@/lib/keyframes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatePresence, motion } from "framer-motion";

interface Translations {
  gallery: {
    title: string;
    description?: string;
  };
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isClient, setIsClient] = useState(false);

  const galleryImages = [
    { src: "/gallery-1.jpg", alt: "Wedding Photo 1", aspectRatio: 0.75 }, // Portrait
    { src: "/gallery-2.jpg", alt: "Wedding Photo 2", aspectRatio: 1.25 }, // Landscape
    { src: "/gallery-3.jpg", alt: "Wedding Photo 3", aspectRatio: 0.85 }, // Portrait (changed from square)
    { src: "/gallery-4.jpg", alt: "Wedding Photo 4", aspectRatio: 0.8 }, // Portrait
    { src: "/gallery-5.jpg", alt: "Wedding Photo 5", aspectRatio: 0.9 }, // Portrait (changed from landscape)
    { src: "/gallery-6.jpg", alt: "Wedding Photo 6", aspectRatio: 0.95 }, // Portrait (changed from landscape)
    { src: "/gallery-7.jpg", alt: "Wedding Photo 7", aspectRatio: 0.9 }, // Almost square
    { src: "/gallery-8.jpg", alt: "Wedding Photo 8", aspectRatio: 1.6 }, // Wide landscape
    { src: "/gallery-9.jpg", alt: "Wedding Photo 9", aspectRatio: 0.7 }, // Tall portrait
    { src: "/gallery-10.jpg", alt: "Wedding Photo 10", aspectRatio: 0.7 }, // Tall portrait
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

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

    if (isClient) {
      loadTranslations();

      // Listen for language changes
      const handleStorageChange = () => {
        loadTranslations();
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [isClient]);

  return (
    <>
      <section className="min-h-svh bg-gradient-to-br from-stone-200 via-stone-300 to-stone-200 py-20 px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/pattern.svg')`,
              backgroundSize: "100px 100px",
              backgroundRepeat: "repeat",
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Anim className="block">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {translations?.gallery.title}
              </h2>
              <div className="w-20 h-0.5 bg-stone-600 mx-auto"></div>
            </div>
          </Anim>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <Anim>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  // delay={index * 100}
                  className="block mb-4 break-inside-avoid"
                >
                  <div
                    className="relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 "
                    onClick={() => {
                      setSelectedImage(image.src);
                      setSelectedIndex(index);
                    }}
                  >
                    <div
                      className="relative w-full rounded-xl overflow-hidden"
                      style={{ aspectRatio: image.aspectRatio }}
                    >
                      <Image
                        src={
                          image.src ||
                          "/placeholder.svg?height=400&width=300&query=wedding photo"
                        }
                        alt={image.alt}
                        fill
                        className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 "
                        priority={index < 6}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Anim>
          </div>

          {/* Gallery Description */}
          <Anim delay={700} keyframes={slideInUp} className="block">
            <div className="mt-16 text-center">
              <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto">
                {translations?.gallery.description}
              </p>
            </div>
          </Anim>
        </div>
      </section>

      {/* Lightbox Modal with Carousel */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              // Only close if clicking the background, not the carousel or its children
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-stone-300 transition-colors z-10"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <Carousel
                opts={{
                  startIndex: selectedIndex,
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="flex items-center">
                      <div className="flex items-center justify-center">
                        <Image
                          src={
                            image.src ||
                            "/placeholder.svg?height=600&width=400&query=wedding photo"
                          }
                          alt={image.alt}
                          width={0}
                          height={0}
                          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                          sizes="90vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/10 border-white/50 text-white hover:bg-white/60" />
                <CarouselNext className="right-4 bg-white/10 border-white/50 text-white hover:bg-white/60" />
              </Carousel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
