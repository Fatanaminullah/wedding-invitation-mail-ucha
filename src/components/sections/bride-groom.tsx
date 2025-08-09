'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Instagram, Heart } from 'lucide-react'
import Anim from '@/components/global/anim'

interface Translations {
  bride: {
    name: string
    title: string
    detail: string
    instagram: string
  }
  groom: {
    name: string
    title: string
    detail: string
    instagram: string
  }
}

export default function BrideGroom() {
  const [translations, setTranslations] = useState<Translations | null>(null)

  useEffect(() => {
    const loadTranslations = async () => {
      const locale = localStorage.getItem('locale') || 'id'
      try {
        const translationModule = await import(`../../../messages/${locale}.json`)
        setTranslations(translationModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to Indonesian
        const fallbackModule = await import('../../../messages/id.json')
        setTranslations(fallbackModule.default)
      }
    }

    loadTranslations()

    // Listen for language changes
    const handleStorageChange = () => {
      loadTranslations()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (!translations) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-20 px-6">
      <div className="max-w-md mx-auto">
        <Anim>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              The Happy Couple
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
          </div>
        </Anim>

        {/* Bride Card */}
        <Anim delay={200}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-stone-100">
            <div className="relative h-80">
              <Image
                src="/bride.jpg"
                alt="Bride"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {translations.bride.name}
              </h3>
              <p className="text-stone-600 font-medium mb-3">
                {translations.bride.title}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {translations.bride.detail}
              </p>
              <a
                href={`https://instagram.com/${translations.bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300"
              >
                <Instagram size={16} />
                {translations.bride.instagram}
              </a>
            </div>
          </div>
        </Anim>

        {/* Heart Divider */}
        <Anim delay={400}>
          <div className="text-center mb-8">
            <Heart className="h-8 w-8 text-stone-400 mx-auto" />
          </div>
        </Anim>

        {/* Groom Card */}
        <Anim delay={600}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100">
            <div className="relative h-80">
              <Image
                src="/groom.jpg"
                alt="Groom"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {translations.groom.name}
              </h3>
              <p className="text-stone-600 font-medium mb-3">
                {translations.groom.title}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {translations.groom.detail}
              </p>
              <a
                href={`https://instagram.com/${translations.groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300"
              >
                <Instagram size={16} />
                {translations.groom.instagram}
              </a>
            </div>
          </div>
        </Anim>
      </div>
    </section>
  )
}
