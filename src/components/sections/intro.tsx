'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Fade } from 'react-awesome-reveal'
import { Button } from '@/components/ui/button'

interface IntroProps {
  onOpenInvitation: () => void
}

export default function Intro({ onOpenInvitation }: IntroProps) {
  const [guestName, setGuestName] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const guest = searchParams.get('guest')
    if (guest) {
      setGuestName(decodeURIComponent(guest))
    }
  }, [searchParams])

  // Get current locale from localStorage (temporary solution)
  const [locale, setLocale] = useState('id')
  
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'id'
    setLocale(savedLocale)
  }, [])

  const translations = {
    id: {
      title: "The wedding of Ucha & Mail",
      greeting: "Kepada Yth.",
      guestName: "Bapak/Ibu/Saudara/i",
      openInvitation: "Buka Undangan"
    },
    en: {
      title: "The wedding of Ucha & Mail",
      greeting: "Dear",
      guestName: "Mr./Mrs./Ms.",
      openInvitation: "Open Invitation"
    }
  }

  const t = translations[locale as keyof typeof translations]

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="relative text-center px-8 max-w-md">
        <Fade triggerOnce duration={1000}>
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-gray-800 mb-4 leading-tight">
              {t.title}
            </h1>
          </div>
        </Fade>

        <Fade triggerOnce duration={1000} delay={300}>
          <div className="mb-8 text-gray-600">
            <p className="text-lg mb-2">{t.greeting}</p>
            <p className="text-xl font-medium text-gray-800">
              {guestName || t.guestName}
            </p>
          </div>
        </Fade>

        <Fade triggerOnce duration={1000} delay={600}>
          <Button
            onClick={onOpenInvitation}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t.openInvitation}
          </Button>
        </Fade>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-8 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-16 w-12 h-12 bg-red-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  )
}
