"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface MobileFrameProps {
  children: ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <>
      {/* Desktop: QR Code Landing Page - NO ACCESS TO WEDDING CONTENT */}
      <div className="hidden md:flex min-h-screen bg-gradient-to-br from-stone-600 to-stone-700 flex-col">
        {/* Top - Wedding Title */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <div className="text-center text-white px-8">
            <h1 className="text-6xl font-serif mb-4 tracking-wider">
              Ucha & Mail
            </h1>
            <p className="text-xl text-stone-200 uppercase tracking-[0.3em] font-light">
              Wedding Invitation
            </p>
          </div>
        </div>

        {/* Middle - QR Code */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            {/* QR Code Image */}
            <div className="w-64 h-64 bg-white border-4 border-gray-200 rounded-2xl overflow-hidden mx-auto mb-8">
              <Image
                src="/qr-code.jpg"
                alt="QR Code"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-serif text-gray-800 mb-2">
                Ucha & Mail
              </h3>
              <p className="text-sm text-gray-600 mb-4">Wedding Invitation</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Scan to view on mobile
              </p>
            </div>
          </div>
        </div>

        {/* Bottom - Instructions */}
        <div className="flex-1 flex items-start justify-center pt-8">
          <div className="text-center text-white px-8">
            <p className="text-lg text-stone-200 leading-relaxed max-w-sm">
              Scan the QR code to view on your mobile for the best experience
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Full wedding invitation content */}
      <div className="md:hidden">{children}</div>
    </>
  );
}
