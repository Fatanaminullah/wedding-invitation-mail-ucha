"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Anim from "@/components/global/anim";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Translations {
  gallery: {
    title: string;
    description?: string;
  };
}

export default function Gallery() {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

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

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api || !thumbApi) return;
      api.scrollTo(index);
    },
    [api, thumbApi]
  );

  const galleryImages = [
    { src: "/gallery-1.jpg", alt: "Wedding Photo 1" },
    { src: "/gallery-2.jpg", alt: "Wedding Photo 2" },
    { src: "/gallery-3.jpg", alt: "Wedding Photo 3" },
    { src: "/gallery-4.jpg", alt: "Wedding Photo 4" },
    { src: "/gallery-5.jpg", alt: "Wedding Photo 5" },
  ];

  if (!translations || !isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-stone-50 py-20 px-6">
      <div className="max-w-md mx-auto">
        <Anim className="block">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              {translations.gallery.title}
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
          </div>
        </Anim>

        {/* Main Gallery Carousel */}
        <div className="overflow-hidden">
          <Anim delay={300} className="block">
            <div className="mb-6">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                        {/* Photo Counter */}
                        <div className="absolute bottom-4 right-4 z-10 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                          {activeIndex + 1} / {galleryImages.length}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation Buttons */}
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-lg backdrop-blur-sm h-12 w-12" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-lg backdrop-blur-sm h-12 w-12" />
              </Carousel>
            </div>
          </Anim>
        </div>

        {/* Thumbnail Carousel */}
        <div className="overflow-hidden">
          <Anim delay={500} className="block">
            <Carousel
              setApi={setThumbApi}
              opts={{
                align: "start",
                dragFree: true,
                containScroll: 'keepSnaps',
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {galleryImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      "pl-3 basis-1/4",
                      activeIndex === index
                        ? "embla-thumbs__slide--selected"
                        : ""
                    )}
                  >
                    <div
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        activeIndex === index
                          ? "ring-2 ring-stone-400 opacity-100 scale-105"
                          : "opacity-70 hover:opacity-90"
                      }`}
                      onClick={() => onThumbClick(index)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 20vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Anim>
        </div>

        {/* Gallery Description */}
        <div className="overflow-hidden">
          <Anim delay={700} className="block">
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm leading-relaxed">
                {translations.gallery.description ||
                  "Kumpulan momen indah dari perjalanan cinta kami. Swipe untuk melihat foto lainnya."}
              </p>
            </div>
          </Anim>
        </div>
      </div>
    </section>
  );
}
