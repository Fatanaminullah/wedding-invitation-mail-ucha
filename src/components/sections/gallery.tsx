'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Anim from '@/components/global/anim'

interface Translations {
  gallery: {
    title: string
  }
}

export default function Gallery() {
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

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

  const galleryImages = [
    { src: '/gallery-1.jpg', alt: 'Wedding Photo 1' },
    { src: '/gallery-2.jpg', alt: 'Wedding Photo 2' },
    { src: '/gallery-3.jpg', alt: 'Wedding Photo 3' },
    { src: '/gallery-4.jpg', alt: 'Wedding Photo 4' },
    { src: '/gallery-5.jpg', alt: 'Wedding Photo 5' },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage])

  if (!translations) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-stone-50 py-20 px-6">
        <div className="max-w-md mx-auto">
          <Anim className="block">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {translations.gallery.title}
              </h2>
              <div className="w-20 h-0.5 bg-stone-400 mx-auto"></div>
            </div>
          </Anim>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <Anim delay={200 * (index + 1)} className="block">
                  <div 
                    className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-xl transition-all duration-300 ${
                      index === 0 ? 'col-span-2 h-64' : 'h-48'
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-3">
                        <svg 
                          className="w-6 h-6 text-gray-800" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Anim>
              </div>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="overflow-hidden">
            <Anim delay={1400} className="block">
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-sm mb-4">
                  Tap on any photo to view in full size
                </p>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
          >
            <X className="text-white" size={24} />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-full px-4 py-2">
            <span className="text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}
    </>
  )
}
