---
applyTo: '**'
---

# Wedding Invitation Website - AI Coding Instructions

## Project Architecture

This is a **Next.js 15** wedding invitation website for "Ucha & Mail" with TypeScript, Tailwind CSS v4, and mobile-first responsive design. The core architecture revolves around a **QR code desktop landing page** and **localStorage-based internationalization**.

### Key Architectural Patterns

**QR Code Desktop Strategy**: The `mobile-frame.tsx` component creates a QR code landing page on desktop (≥768px) while showing the full wedding invitation on mobile. This ensures optimal mobile UX:
```tsx
{/* Desktop: QR code landing page */}
<div className="hidden md:flex min-h-screen bg-gradient-to-br from-stone-900 via-gray-900 to-stone-800">
{/* Mobile: full wedding invitation */} 
<div className="md:hidden w-full min-h-screen">
```

**State Management Flow**: Main page (`src/app/page.tsx`) orchestrates the intro overlay and music auto-play through local state:
- `showIntro: true` → displays fullscreen intro overlay
- `handleOpenInvitation()` → hides intro, enables music auto-play
- All sections render conditionally after intro dismissal

**Language Switching**: Simplified localStorage approach instead of next-intl routing:
- Translations stored in `messages/id.json` and `messages/en.json`
- `language-toggle.tsx` persists choice in localStorage
- Each component reads locale with `localStorage.getItem('locale') || 'id'`

## Essential Development Commands

```bash
# Development (uses Turbopack for faster builds)
npm run dev  # Runs on http://localhost:3001 (3000 often in use)

# The website expects these asset paths:
/public/audio/wedding-song.mp3  # Main wedding audio
/public/[image-name].jpg        # Wedding photos (banner.jpg, bride.jpg, etc.)
/public/pattern.svg             # Decorative pattern overlay
```

## Component Structure & Dependencies

**Core Layout Stack**:
```
page.tsx → MobileFrame → [LanguageToggle, MusicPlayer, Intro/Banner, ...]
```

**Critical Component Dependencies**:
- `mobile-frame.tsx`: Wrapper for all content, handles responsive phone simulation
- `language-toggle.tsx`: Top-right sticky, toggles between ID/EN with globe icon
- `music-player.tsx`: Bottom-right sticky, auto-plays after intro (uses HTML5 Audio API)
- `sections/intro.tsx`: Fullscreen overlay, extracts guest names from URL params (`?guest=name`)
- `sections/banner.tsx`: Hero with live countdown to Sept 6, 2025 using `setInterval`

**Animation Patterns**: All sections use `react-awesome-reveal` with consistent timing:
```tsx
<Fade triggerOnce duration={1000}>  {/* Primary animation - use Fade for most elements */}
<Slide direction="up" triggerOnce duration={1000} delay={300}>
```

**Animation Best Practices**:
- **Primary**: Use `<Fade>` for most animations (cleaner, no overflow issues)
- **Slide Usage**: When using `<Slide>`, always wrap in `overflow-hidden` div to prevent layout shift:
```tsx
<div className="overflow-hidden">
  <Slide direction="up" triggerOnce duration={1000}>
    <YourContent />
  </Slide>
</div>
```

## Database Integration (Supabase)

**Connection Setup**: `src/lib/supabase.ts` exports configured client and TypeScript interfaces:
```typescript
export interface RSVP {
  name: string
  guest_count: 1 | 2  
  attendance: 'hadir' | 'tidak'
}
```

**Real-time Pattern**: For blessings section, use Supabase real-time subscriptions:
```typescript
supabase.channel('blessings').on('postgres_changes', {...}).subscribe()
```

## Current Development Status

**Completed**: Foundation (mobile frame, language toggle, intro, banner, countdown)
**Next Phase**: 8 remaining sections (bride/groom, verse, save-date, rsvp, gallery, gifts, blessings, footer)
**Reference Images**: Check `references/[1-11]_*.png` for exact UI mockups

## Critical Technical Notes

- **Tailwind CSS v4**: Uses new `@tailwindcss/postcss` plugin syntax
- **Font Loading**: Uses `Inter` and `Playfair Display` from `next/font/google`
- **Smooth Scrolling**: `useLenis()` hook handles Lenis initialization with optimized easing
- **Image Optimization**: All images use `next/image` with `fill` prop and `priority` for above-fold content
- **Guest URL Params**: Extract guest names using `useSearchParams()` for personalization

**Audio Handling**: Music player expects `/audio/wedding-song.mp3` and includes error handling for autoplay restrictions

## Debugging Context

**Development Server**: Runs on port 3001 (3000 often occupied)
**Common Issues**: 
- Missing audio file = expected 404 in console
- Responsive testing: use Chrome DevTools mobile simulation
- Language switching: Check browser localStorage for 'locale' key persistence

Reference `DEVELOPMENT_INSTRUCTIONS.md` for complete project roadmap and phase tracking.
