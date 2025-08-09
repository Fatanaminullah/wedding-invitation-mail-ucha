'use client'

import { useState, useEffect } from 'react'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LanguageToggle() {
  const [currentLocale, setCurrentLocale] = useState('id')

  useEffect(() => {
    // Get current locale from localStorage or default to 'id'
    const savedLocale = localStorage.getItem('locale') || 'id'
    setCurrentLocale(savedLocale)
  }, [])

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'id' ? 'en' : 'id'
    setCurrentLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Reload page to apply new locale (we'll improve this later with proper routing)
    window.location.reload()
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white/95 text-gray-700"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLocale === 'id' ? 'EN' : 'ID'}
        </span>
      </Button>
    </div>
  )
}
