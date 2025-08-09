"use client";
import { ReactLenis } from "lenis/react";

type LenisProviderProp = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: Readonly<LenisProviderProp>) {
  const config = { lerp: 0.1 };

  return (
    <ReactLenis root options={config}>
      {children}
    </ReactLenis>
  );
}
