"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Heart, ArrowRight } from "lucide-react";
import Anim from "@/components/global/anim";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IntroProps {
  onOpenInvitation: () => void;
}

export default function Intro({ onOpenInvitation }: IntroProps) {
  const [guestName, setGuestName] = useState("");
  const searchParams = useSearchParams();

  // Extract guest name from URL params
  useEffect(() => {
    const guest = searchParams.get("guest");
    if (guest) {
      setGuestName(decodeURIComponent(guest));
    }
  }, [searchParams]);

  // Get language from localStorage
  const [locale, setLocale] = useState("id");
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "id";
    setLocale(savedLocale);
  }, []);

  const translations = {
    id: {
      title: "The wedding of Ucha & Ismail",
      greeting: "Kepada Yth.",
      guestPlaceholder: "Tamu Undangan",
      openButton: "Buka Undangan",
    },
    en: {
      title: "The wedding of Ucha & Ismail",
      greeting: "Dear",
      guestPlaceholder: "Honored Guest",
      openButton: "Open Invitation",
    },
  };

  const t = translations[locale as keyof typeof translations];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/gallery-5.jpg"
          alt="Wedding Intro"
          width={0}
          height={0}
          className="w-full h-full object-cover absolute top-0"
          sizes="100vw"
        />
        {/* Gradient overlay for smooth transition */}
        <div className="absolute top-0 h-full w-full bg-gradient-to-t from-black/100  to-black/0" />
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="relative text-center px-8 max-w-md mt-auto pb-20">
        <Anim className="block">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-white mb-4 leading-tight drop-shadow-lg">
              The Wedding of <br />
              <span className="text-stone-200 font-semibold">Ucha & Ismail</span>
            </h1>
          </div>
        </Anim>

        <Anim delay={300} className="block">
          <div className="mb-8 text-white">
            <p className="text-lg mb-2 drop-shadow-md">{t.greeting}</p>
            <p className="text-xl font-medium text-white drop-shadow-md">
              {guestName || t.guestPlaceholder}
            </p>
          </div>
        </Anim>

        <Anim delay={600} className="block">
          <div className="mb-12">
            <div className="w-24 h-0.5 bg-white/60 mx-auto"></div>
          </div>

          <Button
            onClick={onOpenInvitation}
            className="bg-gradient-to-r from-stone-600 to-gray-700 hover:from-stone-700 hover:to-gray-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <span className="mr-3">{t.openButton}</span>
          </Button>
        </Anim>
      </div>
    </div>
  );
}
