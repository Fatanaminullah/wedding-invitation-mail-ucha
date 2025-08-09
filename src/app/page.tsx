'use client'

import { useState, Suspense } from 'react'
import MobileFrame from '@/components/mobile-frame'
import LanguageToggle from '@/components/language-toggle'
import MusicPlayer from '@/components/music-player'
import Intro from '@/components/sections/intro'
import Banner from '@/components/sections/banner'
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
          
          {/* Placeholder for other sections */}
          <div className="h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-2xl text-gray-600">More sections coming soon...</p>
          </div>
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
