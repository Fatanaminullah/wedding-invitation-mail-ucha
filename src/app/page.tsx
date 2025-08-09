'use client'

import LanguageToggle from '@/components/language-toggle'
import MobileFrame from '@/components/mobile-frame'
import MusicPlayer from '@/components/music-player'
import Banner from '@/components/sections/banner'
import Blessing from '@/components/sections/blessing'
import BrideGroom from '@/components/sections/bride-groom'
import Footer from '@/components/sections/footer'
import Gallery from '@/components/sections/gallery'
import Intro from '@/components/sections/intro'
import RSVP from '@/components/sections/rsvp'
import SaveTheDate from '@/components/sections/save-the-date'
import Verse from '@/components/sections/verse'
import WeddingGift from '@/components/sections/wedding-gift'
import { Suspense, useState } from 'react'

function HomeContent() {
  const [showIntro, setShowIntro] = useState(true)
  const [musicAutoPlay, setMusicAutoPlay] = useState(false)

  const handleOpenInvitation = () => {
    setShowIntro(false)
    // Trigger music immediately when button is clicked
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
