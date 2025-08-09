'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, CreditCard, Building2 } from 'lucide-react'
import { Fade, Slide } from 'react-awesome-reveal'
import { Button } from '@/components/ui/button'

interface Translations {
  weddingGift: {
    title: string
    description: string
    copyButton: string
    copiedMessage: string
  }
}

interface BankAccount {
  bankName: string
  accountNumber: string
  accountName: string
  icon: 'card' | 'building'
}

export default function WeddingGift() {
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

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

  const bankAccounts: BankAccount[] = [
    {
      bankName: 'Bank BCA',
      accountNumber: '5465123456',
      accountName: 'Salsabila Azzahra',
      icon: 'card'
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1370014567890',
      accountName: 'Ismail Abdan Syakuro F.',
      icon: 'building'
    }
  ]

  const copyToClipboard = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopiedAccount(accountNumber)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = accountNumber
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedAccount(accountNumber)
      setTimeout(() => setCopiedAccount(null), 2000)
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
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-amber-50 py-20 px-6">
      <div className="max-w-md mx-auto">
        <Fade triggerOnce duration={1000}>
          <div className="text-center mb-16">
            <div className="text-4xl mb-4">🎁</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {translations.weddingGift.title}
            </h2>
            <div className="w-20 h-0.5 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {translations.weddingGift.description}
            </p>
          </div>
        </Fade>

        <div className="space-y-6">
          {bankAccounts.map((account, index) => (
            <div key={account.accountNumber} className="overflow-hidden">
              <Slide direction="up" triggerOnce duration={1000} delay={200 * (index + 1)}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    {/* Bank Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                        {account.icon === 'card' ? (
                          <CreditCard className="text-white" size={24} />
                        ) : (
                          <Building2 className="text-white" size={24} />
                        )}
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">
                        {account.bankName}
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Account Number
                          </p>
                          <p className="font-mono text-lg font-semibold text-gray-800 tracking-wider">
                            {account.accountNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Account Name
                          </p>
                          <p className="font-medium text-gray-700">
                            {account.accountName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <div className="mt-6">
                    <Button
                      onClick={() => copyToClipboard(account.accountNumber)}
                      className={`w-full ${
                        copiedAccount === account.accountNumber
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-amber-600 hover:bg-amber-700'
                      } text-white transition-colors duration-200`}
                    >
                      {copiedAccount === account.accountNumber ? (
                        <>
                          <Check size={16} className="mr-2" />
                          {translations.weddingGift.copiedMessage}
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-2" />
                          {translations.weddingGift.copyButton}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Slide>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="overflow-hidden">
          <Slide direction="up" triggerOnce duration={1000} delay={600}>
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="text-2xl mb-4">💝</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your presence at our wedding is the greatest gift of all. 
                  However, if you wish to honor us with a gift, 
                  we would be grateful for any contribution.
                </p>
              </div>
            </div>
          </Slide>
        </div>

        {/* Decorative Elements */}
        <div className="overflow-hidden">
          <Slide direction="up" triggerOnce duration={1000} delay={800}>
            <div className="mt-8 text-center">
              <div className="flex justify-center gap-4 text-2xl opacity-60">
                <span>💳</span>
                <span>💰</span>
                <span>🏦</span>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  )
}
