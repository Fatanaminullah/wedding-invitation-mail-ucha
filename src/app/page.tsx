'use client'

import { useState, Suspense } from 'react'
import MobileFrame from '@/components/mobile-frame'
import LanguageToggle from '@/components/language-toggle'
import MusicPlayer from '@/components/music-player'
import Intro from '@/components/sections/intro'
import Banner from '@/components/sections/banner'
import BrideGroom from '@/components/sections/bride-groom'
import Verse from '@/components/sections/verse'
import SaveTheDate from '@/components/sections/save-the-date'
import RSVP from '@/components/sections/rsvp'
import Gallery from '@/components/sections/gallery'
import WeddingGift from '@/components/sections/wedding-gift'
import Blessing from '@/components/sections/blessing'
import Footer from '@/components/sections/footer'
import { useLenis } from '@/hooks/use-lenis'

function HomeContent() {
  const [showIntro, setShowIntro] = useState(true)
  const [musicAutoPlay, setMusicAutoPlay] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  const handleOpenInvitation = () => {
    setShowIntro(false)
    setMusicAutoPlay(true)
  }

  return (
    <MobileFrame>
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Music Player - only show after intro */}
      {!showIntro && <MusicPlayer autoPlay={musicAutoPlay} />}

      {/* Intro Overlay */}
      {showIntro && <Intro onOpenInvitation={handleOpenInvitation} />}

      {/* Main Content */}
      {!showIntro && (
        <div className="min-h-screen">
          <Banner />
          <BrideGroom />
          <Verse />
          <SaveTheDate />
          <RSVP />
          <Gallery />
          <WeddingGift />
          <Blessing />
          <Footer />
        </div>
      )}
    </MobileFrame>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
