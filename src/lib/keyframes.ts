"use client"
import { keyframes } from "@emotion/react"

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
`

export const slideInUp = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`

export const zoomInSm = keyframes`
  from {
    transform: scale(1.2);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`
