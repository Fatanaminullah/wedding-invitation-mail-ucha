'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Anim from '@/components/global/anim'

export default function Banner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Get current locale from localStorage (temporary solution)
  const [locale, setLocale] = useState('id')
  
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'id'
    setLocale(savedLocale)
  }, [])

  const translations = {
    id: {
      title: "The wedding of Ucha & Mail",
      description: "Assalamu'alaikum Wr. Wb. Dengan memohon Ridho, Rahmat, dan berkah Allah kami bermaksud untuk mengundang Saudara/i dalam acara pernikahan yang kami selenggarakan.",
      days: "Hari",
      hours: "Jam", 
      minutes: "Menit",
      seconds: "Detik"
    },
    en: {
      title: "The wedding of Ucha & Mail",
      description: "Assalamu'alaikum Wr. Wb. With the blessings, mercy, and grace of Allah, we intend to invite you to the wedding ceremony we are organizing.",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes", 
      seconds: "Seconds"
    }
  }

  const t = translations[locale as keyof typeof translations]

  useEffect(() => {
    const weddingDate = new Date('2025-09-06T07:00:00').getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.jpg"
          alt="Wedding Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <Anim>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            {t.title}
          </h1>
        </Anim>

        <Anim delay={300}>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
            {t.description}
          </p>
        </Anim>

        {/* Countdown */}
        <Anim delay={600}>
          <div className="flex justify-center gap-4 md:gap-8">
            {[
              { value: timeLeft.days, label: t.days },
              { value: timeLeft.hours, label: t.hours },
              { value: timeLeft.minutes, label: t.minutes },
              { value: timeLeft.seconds, label: t.seconds }
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]"
              >
                <div className="text-2xl md:text-4xl font-bold mb-1">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-white/80">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Anim>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  )
}
