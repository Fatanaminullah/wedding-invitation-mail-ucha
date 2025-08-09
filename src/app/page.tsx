"use client";

import LanguageToggle from "@/components/language-toggle";
import MobileFrame from "@/components/mobile-frame";
import MusicPlayer from "@/components/music-player";
import Banner from "@/components/sections/banner";
import Blessing from "@/components/sections/blessing";
import BrideGroom from "@/components/sections/bride-groom";
import Footer from "@/components/sections/footer";
import Gallery from "@/components/sections/gallery";
import Intro from "@/components/sections/intro";
import RSVP from "@/components/sections/rsvp";
import SaveTheDate from "@/components/sections/save-the-date";
import Verse from "@/components/sections/verse";
import WeddingGift from "@/components/sections/wedding-gift";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HomeContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);

  const handleOpenInvitation = () => {
    setShowIntro(false);
    // Trigger music immediately when button is clicked
    setMusicAutoPlay(true);
  };

  return (
    <MobileFrame>
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Music Player - only show after intro */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MusicPlayer autoPlay={musicAutoPlay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Overlay with Fade Transition */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Intro onOpenInvitation={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Fade Transition */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="min-h-screen"
          >
            <Banner />
            <BrideGroom />
            <Verse />
            <SaveTheDate />
            <RSVP />
            <Gallery />
            <WeddingGift />
            <Blessing />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </MobileFrame>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
