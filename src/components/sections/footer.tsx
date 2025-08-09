'use client'

import { useState, useEffect } from 'react'
import Anim from '@/components/global/anim'

interface Translations {
  footer: {
    message: string
    signature: string
    names: string
  }
}

export default function Footer() {
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
    <footer className="min-h-screen bg-gradient-to-b from-gray-50 to-stone-50 flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Anim className="block">
          {/* Decorative Top */}
          <div className="mb-12">
            <div className="text-4xl mb-6">💕</div>
            <div className="w-32 h-0.5 bg-stone-400 mx-auto"></div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <Anim delay={200} className="block">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-light">
                {translations.footer.message}
              </p>
            </Anim>
          </div>

          {/* Signature */}
          <div className="mb-12">
            <Anim delay={400} className="block">
              <div className="space-y-4">
                <p className="text-base text-gray-600 italic">
                  {translations.footer.signature}
                </p>
                <div className="text-3xl font-bold bg-gradient-to-r from-stone-600 to-gray-700 bg-clip-text text-transparent">
                  {translations.footer.names}
                </div>
              </div>
            </Anim>
          </div>

          {/* Decorative Hearts */}
          <div className="mb-12">
            <Anim delay={600} className="block">
              <div className="flex justify-center gap-4 text-2xl opacity-60">
                <span className="animate-pulse">💖</span>
                <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>💕</span>
                <span className="animate-pulse" style={{ animationDelay: '1s' }}>💖</span>
              </div>
            </Anim>
          </div>

          {/* Final Thank You */}
          <div className="mb-8">
            <Anim delay={800} className="block">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-2xl mb-4">🙏</div>
                <p className="text-sm text-gray-600">
                  Thank you for being part of our special day!
                </p>
              </div>
            </Anim>
          </div>

          {/* Bottom Decoration */}
          <div>
            <Anim delay={1000} className="block">
              <div className="space-y-4">
                <div className="w-24 h-0.5 bg-stone-400 mx-auto"></div>
                <p className="text-xs text-gray-500 tracking-wider">
                  {new Date().getFullYear()} • Ucha & Mail Wedding
                </p>
              </div>
            </Anim>
          </div>
        </Anim>
      </div>
    </footer>
  )
}
