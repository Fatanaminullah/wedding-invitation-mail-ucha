'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, ExternalLink, Heart } from 'lucide-react'
import Anim from '@/components/global/anim'
import { Button } from '@/components/ui/button'

interface Translations {
  saveTheDate: {
    title: string
    akad: {
      title: string
      date: string
      time: string
      location: string
      address: string
      mapButton: string
    }
    resepsi: {
      title: string
      date: string
      time: string
      location: string
      address: string
      mapButton: string
    }
  }
}

export default function SaveTheDate() {
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

  // Google Maps URL for the venue
  const mapsUrl = "https://maps.google.com/maps?q=Aula+Sarbini+Taman+Rekreasi+Wiladatika,+Jl+Pusdika+Raya+No.6B,+Harjamukti,+Kec.+Cimanggis,+Kota+Depok,+Jawa+Barat+16454"

  const EventCard = ({ 
    event, 
    index, 
    bgColor, 
    accentColor 
  }: { 
    event: typeof translations.saveTheDate.akad
    index: number
    bgColor: string
    accentColor: string
  }) => (
    <div className="overflow-hidden">
      <Anim delay={200 * (index + 1)} className="block">
        <div className={`${bgColor} rounded-2xl shadow-lg p-6 border border-gray-100`}>
          <div className="text-center mb-6">
            <h3 className={`text-2xl font-bold ${accentColor} mb-2`}>
              {event.title}
            </h3>
            <div className="w-16 h-0.5 bg-current mx-auto opacity-60"></div>
          </div>

          <div className="space-y-4">
            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className={`${accentColor} mt-1 flex-shrink-0`} size={20} />
              <div>
                <p className="font-medium text-gray-800">{event.date}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className={`${accentColor} mt-1 flex-shrink-0`} size={20} />
              <div>
                <p className="font-medium text-gray-800">{event.time}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className={`${accentColor} mt-1 flex-shrink-0`} size={20} />
              <div>
                <p className="font-medium text-gray-800 mb-1">{event.location}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{event.address}</p>
              </div>
            </div>
          </div>

          {/* Maps Button */}
          <div className="mt-6 text-center">
            <Button
              onClick={() => window.open(mapsUrl, '_blank')}
              className={`${accentColor === 'text-stone-600' ? 'bg-stone-600 hover:bg-stone-700' : 'bg-gray-600 hover:bg-gray-700'} text-white w-full`}
            >
              <ExternalLink size={16} className="mr-2" />
              {event.mapButton}
            </Button>
          </div>
        </div>
      </Anim>
    </div>
  )

  return (
    <section className="min-h-screen bg-gradient-to-b from-stone-50 to-gray-50 py-20 px-6">
      <div className="max-w-md mx-auto">
        <Anim className="block">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {translations.saveTheDate.title}
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
          </div>
        </Anim>

        <div className="space-y-8">
          {/* Akad Event */}
          <EventCard 
            event={translations.saveTheDate.akad} 
            index={0}
            bgColor="bg-gradient-to-br from-stone-50 to-stone-100"
            accentColor="text-stone-600"
          />

          {/* Divider */}
          <div className="overflow-hidden">
            <Anim delay={400} className="block">
              <div className="text-center">
                <Heart className="h-6 w-6 text-stone-600 mx-auto mb-2" />
                <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
              </div>
            </Anim>
          </div>

          {/* Resepsi Event */}
          <EventCard 
            event={translations.saveTheDate.resepsi} 
            index={1}
            bgColor="bg-gradient-to-br from-gray-50 to-gray-100"
            accentColor="text-gray-600"
          />
        </div>

        {/* Additional Info */}
        <div className="overflow-hidden">
          <Anim delay={800} className="block">
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We hope you can join us in celebrating this special moment. 
                  Your presence would mean the world to us!
                </p>
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </section>
  )
}
