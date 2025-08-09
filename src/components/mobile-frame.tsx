'use client'

import { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-0">
      {/* Desktop: Show mobile frame */}
      <div className="hidden md:block">
        <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
            {/* Phone notch simulation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-50"></div>
            {children}
          </div>
        </div>
      </div>
      
      {/* Mobile: Full screen */}
      <div className="md:hidden w-full h-screen">
        {children}
      </div>
    </div>
  )
}
