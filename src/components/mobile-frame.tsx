'use client'

import { ReactNode } from 'react'
import Image from 'next/image'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <>
      {/* Desktop: QR Code Landing Page */}
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

        {/* Center - Phone with QR Code */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[32px] flex items-center justify-center relative overflow-hidden">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10"></div>
                
                {/* QR Code Content */}
                <div className="text-center px-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif text-gray-800 mb-2">
                      Ucha & Mail
                    </h2>
                    <p className="text-sm text-gray-600">
                      Wedding Invitation
                    </p>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <svg 
                      width="192" 
                      height="192" 
                      viewBox="0 0 192 192" 
                      className="text-gray-800"
                    >
                      {/* QR Code Pattern - Dummy for now */}
                      <rect x="0" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="24" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="48" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="72" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="24" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="48" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="72" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="96" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="120" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="144" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="0" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="24" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="48" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="72" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="144" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="120" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="96" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="72" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="48" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="24" y="96" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="24" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="48" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="72" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="96" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="120" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="144" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="168" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="144" width="24" height="24" fill="currentColor"/>
                      <rect x="168" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="144" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="120" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="96" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="72" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="48" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="24" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="120" width="24" height="24" fill="currentColor"/>
                      <rect x="0" y="144" width="24" height="24" fill="currentColor"/>
                      {/* Add more QR pattern elements as needed */}
                    </svg>
                  </div>
                  
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Scan QR code to view invitation on your mobile device
                  </p>
                </div>
              </div>
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
      
      {/* Mobile: Full screen wedding invitation */}
      <div className="md:hidden w-full min-h-screen">
        {children}
      </div>
    </>
  )
}
