# Wedding Invitation Website Development Instructions

## Project Overview
Build a mobile-first wedding invitation website for Ucha & Mail with modern animations, music integration, and backend functionality for RSVP and blessings.

## Tech Stack

### Frontend
- **Next.js** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/UI** - Component library
- **React Awesome Reveal** - Animation library
- **Lucide React** - Icon library
- **Lenis** - Smooth scrolling library

### Backend & Database (Recommended)
- **Supabase** - PostgreSQL database with real-time features
  - Easy Vercel deployment
  - Built-in authentication
  - Real-time subscriptions
  - REST and GraphQL APIs
  - Simple dashboard for CMS

### Alternative Backend Options
- **PlanetScale** + **Prisma** - MySQL with excellent DX
- **Neon** + **Drizzle** - PostgreSQL with edge compatibility
- **Firebase Firestore** - NoSQL with real-time features

## Step-by-Step Development Guide

### Phase 1: Project Setup & Environment

#### 1.1 Initialize Next.js Project
```bash
npx create-next-app@latest wedding-invitation --typescript --tailwind --eslint --app
cd wedding-invitation
```

#### 1.2 Install Dependencies
```bash
# UI and Animation Libraries
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install react-awesome-reveal lucide-react @studio-freight/lenis

# Shadcn/UI Setup
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea select

# Backend (Supabase)
npm install @supabase/supabase-js

# Audio handling
npm install react-howler
npm install @types/react-howler -D
```

#### 1.3 Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Phase 2: Database Setup (Supabase)

#### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for database to be ready

#### 2.2 Database Schema
Execute in Supabase SQL Editor:

```sql
-- RSVP Table
CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count IN (1, 2)),
  attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('hadir', 'tidak')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blessings Table
CREATE TABLE blessings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE blessings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert on rsvp" ON rsvp
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on rsvp" ON rsvp
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on blessings" ON blessings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read approved blessings" ON blessings
  FOR SELECT USING (is_approved = true);
```

### Phase 3: Core Layout & Mobile Frame

#### 3.1 Create Mobile Frame Component
`components/mobile-frame.tsx`:
```tsx
export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Desktop: Show mobile frame */}
      <div className="hidden md:block">
        <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] p-2">
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      
      {/* Mobile: Full screen */}
      <div className="md:hidden w-full h-screen">
        {children}
      </div>
    </div>
  );
}
```

#### 3.2 Setup Lenis Smooth Scroll
`hooks/use-lenis.ts`:
```tsx
import { useEffect } from 'react';
import { Lenis } from '@studio-freight/lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

### Phase 4: Section Components

#### 4.1 Intro Section (Fullscreen Overlay)
`components/sections/intro.tsx`:
- Fullscreen overlay that covers entire viewport
- "Open Invitation" button
- Guest name parameter from URL
- Reference: `references/1_intro.png`

#### 4.2 Banner Section with Countdown
`components/sections/banner.tsx`:
- Wedding title
- Live countdown to wedding date (September 6, 2025)
- Background image from `content/images/banner.jpg`
- Reference: `references/2_banner.png`

#### 4.3 Bride & Groom Section
`components/sections/bride-groom.tsx`:
- Two-card layout with animations
- Images: `content/images/bride.jpg`, `content/images/groom.jpg`
- Social media links
- References: `references/3_bride-groom-1.png`, `references/4_bride-groom-2.png`

#### 4.4 Verse Section
`components/sections/verse.tsx`:
- Quranic verse (Ar-Rum 21)
- Beautiful typography
- Reference: `references/5_verse.png`

#### 4.5 Save the Date Section
`components/sections/save-the-date.tsx`:
- Event details (Akad & Resepsi)
- Google Maps integration
- Reference: `references/6_save-the-date.png`

#### 4.6 RSVP Section
`components/sections/rsvp.tsx`:
- Form with: Name, Guest Count (1/2), Attendance (Hadir/Tidak)
- Supabase integration
- Form validation
- Reference: `references/7_rsvp.png`

#### 4.7 Gallery Section
`components/sections/gallery.tsx`:
- Image grid layout
- Images: `content/images/gallery-1.jpg` to `gallery-5.jpg`
- Lightbox functionality
- Reference: `references/8_gallery.png`

#### 4.8 Wedding Gift Section
`components/sections/wedding-gift.tsx`:
- Bank account details
- Copy to clipboard functionality
- Reference: `references/9_wedding-gift.png`

#### 4.9 Blessing Section
`components/sections/blessing.tsx`:
- Input form (Name, Message)
- Real-time blessing list
- Supabase real-time subscriptions
- Reference: `references/10_blessing.png`

#### 4.10 Footer Section
`components/sections/footer.tsx`:
- Thank you message
- Couple names
- Reference: `references/11_footer.png`

### Phase 5: Audio Integration

#### 5.1 Music Player Component
`components/music-player.tsx`:
```tsx
// Background music with play/pause toggle
// Sticky position bottom-right
// Auto-play after intro dismissed
// Song: https://youtu.be/CyvRRhXcUvk?si=QvJz4j-pEOSthyFV
```

### Phase 6: Animation Integration

#### 6.1 React Awesome Reveal Setup
- Wrap all content elements with reveal animations
- Use different animation types: fadeIn, slideUp, zoomIn
- Trigger animations once only
- Stagger animations for lists

### Phase 7: Backend API Routes

#### 7.1 RSVP API
`app/api/rsvp/route.ts`:
```tsx
// POST: Create new RSVP
// GET: Fetch RSVP data (for admin)
```

#### 7.2 Blessings API
`app/api/blessings/route.ts`:
```tsx
// POST: Create new blessing
// GET: Fetch approved blessings
```

### Phase 8: Admin CMS

#### 8.1 Admin Dashboard
`app/admin/page.tsx`:
- Protected route (simple password protection)
- RSVP list with export functionality
- Blessings management (approve/delete)
- Basic analytics (total guests, attendance ratio)

### Phase 9: URL Parameters & Guest Names

#### 9.1 Dynamic Guest Names
- URL structure: `/invitation?guest=John+Doe`
- Display guest name in intro section
- Fallback to generic greeting

### Phase 10: Performance & SEO

#### 10.1 Image Optimization
- Use Next.js Image component
- Optimize all images (wedding photos)
- Implement lazy loading

#### 10.2 SEO Setup
```tsx
// Meta tags, Open Graph, structured data
// Wedding-specific schema markup
```

### Phase 11: Deployment

#### 11.1 Vercel Deployment
```bash
# Deploy to Vercel
vercel --prod

# Environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

#### 11.2 Domain Setup
- Custom domain configuration
- SSL certificate (automatic with Vercel)

## File Structure
```
wedding-invitation/
├── app/
│   ├── admin/
│   │   └── page.tsx
│   ├── api/
│   │   ├── rsvp/
│   │   │   └── route.ts
│   │   └── blessings/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── intro.tsx
│   │   ├── banner.tsx
│   │   ├── bride-groom.tsx
│   │   ├── verse.tsx
│   │   ├── save-the-date.tsx
│   │   ├── rsvp.tsx
│   │   ├── gallery.tsx
│   │   ├── wedding-gift.tsx
│   │   ├── blessing.tsx
│   │   └── footer.tsx
│   ├── ui/ (shadcn components)
│   ├── mobile-frame.tsx
│   └── music-player.tsx
├── hooks/
│   ├── use-lenis.ts
│   └── use-supabase.ts
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── public/
│   ├── images/
│   └── audio/
└── types/
    └── index.ts
```

## Testing Checklist

### Functionality
- [ ] Intro overlay shows/hides correctly
- [ ] Music auto-plays and toggle works
- [ ] All animations trigger properly
- [ ] RSVP form submits successfully
- [ ] Blessing form submits and displays
- [ ] Countdown shows correct time
- [ ] Maps links work
- [ ] Copy bank details works
- [ ] Admin dashboard accessible

### Responsive Design
- [ ] Mobile view (< 768px) - full screen
- [ ] Desktop view (≥ 768px) - mobile frame
- [ ] All sections responsive
- [ ] Images properly sized
- [ ] Text readable on all devices

### Performance
- [ ] Images optimized and lazy loaded
- [ ] Audio loads efficiently
- [ ] Smooth scrolling works
- [ ] Fast page load times
- [ ] Database queries optimized

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Safari (iOS/macOS)
- [ ] Firefox (latest)
- [ ] Mobile browsers

## Launch Preparation

1. **Content Review**: Verify all wedding details, dates, and names
2. **Image Quality**: Ensure all photos are high-resolution and properly formatted
3. **Audio Setup**: Convert and host wedding song audio file
4. **Testing**: Complete functionality testing on multiple devices
5. **Backup**: Set up database backups in Supabase
6. **Analytics**: Add Google Analytics (optional)
7. **Domain**: Configure custom domain if desired

## Post-Launch Maintenance

1. **Monitor RSVP responses** through admin dashboard
2. **Moderate blessings** if inappropriate content appears
3. **Export guest list** before wedding day
4. **Backup data** regularly
5. **Archive site** after wedding (optional)

---

**Development Time Estimate**: 40-60 hours
**Complexity Level**: Intermediate
**Priority Features**: RSVP, Music Player, Mobile Responsiveness, Animations

This instruction guide provides a complete roadmap for developing the wedding invitation website with all requested features and modern best practices.
