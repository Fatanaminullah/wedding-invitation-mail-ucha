'use client'

import { useState, useEffect } from 'react'
import { Users, Heart, Send, CheckCircle, X, Check, AlertCircle } from 'lucide-react'
import Anim from '@/components/global/anim'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase, type RSVP } from '@/lib/supabase'

interface Translations {
  rsvp: {
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    guestCountLabel: string
    guestCount1: string
    guestCount2: string
    attendanceLabel: string
    attendanceYes: string
    attendanceNo: string
    submitButton: string
    successMessage: string
  }
  common: {
    loading: string
    error: string
    tryAgain: string
  }
}

interface RSVPForm {
  name: string
  guest_count: 1 | 2
  attendance: 'hadir' | 'tidak'
}

export default function RSVP() {
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [formData, setFormData] = useState<RSVPForm>({
    name: '',
    guest_count: 1,
    attendance: 'hadir'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setErrorMessage(translations?.common?.error || 'Please enter your name')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          guest_count: formData.guest_count,
          attendance: formData.attendance
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit RSVP')
      }

      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({
        name: '',
        guest_count: 1,
        attendance: 'hadir'
      })

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!translations) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-stone-50 py-20 px-6">
      <div className="max-w-md mx-auto">
                <Anim className="block">
          <div className="text-center mb-12">
            <div className="mb-6">
              <Heart className="h-12 w-12 text-stone-600 mx-auto mb-4" />
            </div>
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              {translations.rsvp.title}
            </h2>
            <p className="text-stone-600 text-sm">
              {translations.rsvp.description}
            </p>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto mt-4"></div>
          </div>
        </Anim>

        <div className="overflow-hidden">
          <Anim delay={200} className="block">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Check className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-green-800 text-sm">
                      {translations.rsvp.successMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                    <p className="text-red-800 text-sm">
                      {errorMessage || translations.common.error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.rsvp.nameLabel}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={translations.rsvp.namePlaceholder}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Guest Count Field */}
                <div className="relative z-20">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.rsvp.guestCountLabel}
                  </label>
                  <Select
                    value={formData.guest_count.toString()}
                    onValueChange={(value) => setFormData({ 
                      ...formData, 
                      guest_count: parseInt(value) as 1 | 2 
                    })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white">
                      <SelectItem value="1">{translations.rsvp.guestCount1}</SelectItem>
                      <SelectItem value="2">{translations.rsvp.guestCount2}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Attendance Field */}
                <div className="relative z-10">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.rsvp.attendanceLabel}
                  </label>
                  <Select
                    value={formData.attendance}
                    onValueChange={(value) => setFormData({ 
                      ...formData, 
                      attendance: value as 'hadir' | 'tidak' 
                    })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white">
                      <SelectItem value="hadir">{translations.rsvp.attendanceYes}</SelectItem>
                      <SelectItem value="tidak">{translations.rsvp.attendanceNo}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim()}
                  className="w-full mt-6 bg-stone-600 hover:bg-stone-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {translations.common.loading}
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      {translations.rsvp.submitButton}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Anim>
        </div>

        {/* Bottom decoration */}
        <div className="overflow-hidden">
          <Anim delay={400} className="block">
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 mt-2">
                Your response helps us prepare for our special day
              </p>
            </div>
          </Anim>
        </div>
      </div>
    </section>
  )
}
