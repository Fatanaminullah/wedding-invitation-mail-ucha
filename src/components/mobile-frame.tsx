'use client'

import { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <>
      {/* Desktop: QR Code Landing Page - NO ACCESS TO WEDDING CONTENT */}
      <div className="hidden md:flex min-h-screen bg-gradient-to-br from-stone-900 via-gray-900 to-stone-800">
        <div className="flex-1 flex items-center justify-center">
          {/* Left side - Wedding Title */}
          <div className="text-center text-white px-8">
            <h1 className="text-6xl font-serif mb-4 tracking-wider">
              Ucha & Mail
            </h1>
            <p className="text-xl text-stone-300 uppercase tracking-[0.3em] font-light">
              Wedding Invitation
            </p>
          </div>
        </div>

        {/* Center - QR Code */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            {/* QR Code Placeholder */}
            <div className="w-64 h-64 bg-white border-4 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg 
                width="240" 
                height="240" 
                viewBox="0 0 240 240" 
                className="text-gray-800"
              >
                {/* QR Code Pattern - Dummy for now */}
                <rect x="0" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="30" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="60" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="90" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="30" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="60" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="90" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="120" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="150" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="180" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="0" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="30" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="60" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="90" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="180" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="150" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="120" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="90" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="60" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="30" y="120" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="30" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="60" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="90" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="120" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="150" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="180" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="210" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="180" width="30" height="30" fill="currentColor"/>
                <rect x="210" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="180" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="150" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="120" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="90" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="60" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="30" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="150" width="30" height="30" fill="currentColor"/>
                <rect x="0" y="180" width="30" height="30" fill="currentColor"/>
                {/* Corner squares */}
                <rect x="30" y="30" width="60" height="60" fill="currentColor"/>
                <rect x="150" y="30" width="60" height="60" fill="currentColor"/>
                <rect x="30" y="150" width="60" height="60" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-serif text-gray-800 mb-2">
                Ucha & Mail
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Wedding Invitation
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Scan to view on mobile
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Instructions */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h2 className="text-4xl font-light mb-6 italic">
              JUST <span className="font-serif">one</span> STEP AWAY
            </h2>
            <p className="text-lg text-stone-300 leading-relaxed max-w-sm">
              Scan the QR code to view on your mobile for the best experience
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile: Full wedding invitation content */}
      <div className="md:hidden w-full min-h-screen">
        {children}
      </div>
    </>
  )
}
