# Trae AI Development Rules for Wedding Invitation Project

> **Project**: Wedding Invitation Website for "Ucha & Ismail"
> **Framework**: Next.js 15 with TypeScript
> **Created**: Based on comprehensive project analysis
> **Purpose**: Guide consistent development practices

## 🏗️ **Project Architecture Overview**

### **Core Technology Stack**
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom stone/gray color palette
- **Database**: Supabase with PostgreSQL and real-time features
- **Animations**: Custom Anim component (migrated from React Awesome Reveal)
- **Fonts**: Inter (sans) and Playfair Display (serif)
- **Audio**: React Howler for wedding music integration
- **Smooth Scrolling**: Lenis with custom easing

### **Key Architectural Patterns**
1. **QR Code Desktop Strategy**: Desktop (≥768px) shows QR code landing page, mobile shows full invitation
2. **localStorage Language Switching**: Simple ID/EN toggle without complex routing
3. **State Management**: Local React state for intro overlay and music auto-play
4. **Mobile-First Design**: Responsive design prioritizing mobile experience

## 📋 **Development Rules & Guidelines**

### **1. Component Development Patterns**
```tsx
// ✅ CORRECT: Use custom Anim component
import Anim from "@/components/global/anim";

<Anim delay={300} triggerOnce={true}>
  <YourContent />
</Anim>

// ❌ AVOID: React Awesome Reveal directly
import { Fade } from "react-awesome-reveal";
```

**Rules:**
- **Always use the custom Anim component** instead of React Awesome Reveal
- **Trigger-once animations**: Set `triggerOnce={true}` for all animations
- **Consistent animation delays**: Use 0ms, 300ms, 600ms, 900ms progression
- **Overflow handling**: Wrap `slideInUp` animations in `overflow-hidden` divs
- **Animation types**: Prefer `fadeInUp` for most elements, use `slideInUp` sparingly

### **2. Language & Translation Rules**
```tsx
// ✅ CORRECT: Language handling pattern
const [locale, setLocale] = useState("id");
useEffect(() => {
  const savedLocale = localStorage.getItem("locale") || "id";
  setLocale(savedLocale);
}, []);

const translations = {
  id: { title: "Judul" },
  en: { title: "Title" }
};
const t = translations[locale as keyof typeof translations];
```

**Rules:**
- **Default language**: Indonesian (id) with English (en) toggle
- **Translation structure**: Use nested objects in `messages/id.json` and `messages/en.json`
- **localStorage persistence**: Always save language preference to localStorage
- **Page reload**: Trigger `window.location.reload()` after language change
- **Fallback handling**: Default to Indonesian if no locale found

### **3. Responsive Design Rules**
```tsx
// ✅ CORRECT: Mobile-first responsive pattern
<div className="w-full md:hidden"> {/* Mobile content */}
  <MobileContent />
</div>
<div className="hidden md:flex"> {/* Desktop QR code */}
  <QRCodeLanding />
</div>
```

**Rules:**
- **Mobile-first approach**: Design for mobile, enhance for desktop
- **Desktop QR strategy**: Never show wedding content on desktop ≥768px
- **Breakpoint**: Use `md:` (768px) as the primary responsive breakpoint
- **Mobile frame**: Full screen on mobile, simulated phone frame on desktop

### **4. Database & API Integration**
```tsx
// ✅ CORRECT: Supabase integration pattern
import { supabase, type RSVP, type Blessing } from "@/lib/supabase";

try {
  const { data, error } = await supabase
    .from("rsvp")
    .insert({ name, guest_count, attendance });
  if (error) throw error;
} catch (error) {
  console.error("Database error:", error);
}
```

**Rules:**
- **Supabase client**: Use configured client from `@/lib/supabase`
- **Type safety**: Always use defined interfaces (RSVP, Blessing)
- **Real-time subscriptions**: Implement for blessings section
- **Error handling**: Wrap all database operations in try-catch blocks
- **RLS policies**: Respect Row Level Security for public access

### **5. Audio & Music Rules**
```tsx
// ✅ CORRECT: Audio handling pattern
const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

useEffect(() => {
  const audioElement = new Audio('/audio/wedding-song.mp3');
  audioElement.loop = true;
  audioElement.volume = 0.7;
  setAudio(audioElement);
}, []);

// Auto-play only after user interaction
if (autoPlay && audio) {
  audio.play().catch(console.log);
}
```

**Rules:**
- **Auto-play trigger**: Only after user interaction (intro button click)
- **Audio file path**: `/audio/wedding-song.mp3`
- **Volume control**: Set to 0.7 (70%) by default
- **Loop behavior**: Enable looping for background music
- **Visibility handling**: Pause when tab hidden, resume when visible

### **6. Styling & Design Rules**
```tsx
// ✅ CORRECT: Styling patterns
<div className="bg-gradient-to-br from-stone-600 to-stone-700">
  <h1 className="font-serif text-4xl drop-shadow-lg">
    Wedding Title
  </h1>
</div>
```

**Rules:**
- **Color palette**: Stone/gray gradient theme (`from-stone-600 to-stone-700`)
- **Typography**: Use `font-serif` class for Playfair Display headings
- **Shadows & overlays**: Apply `drop-shadow-lg` for text over images
- **Background patterns**: Use `/pattern.svg` with low opacity overlays
- **Button styling**: Gradient backgrounds with hover scale effects

### **7. Image & Asset Management**
```tsx
// ✅ CORRECT: Next.js Image usage
import Image from "next/image";

<Image
  src="/banner.jpg"
  alt="Wedding Banner"
  width={0}
  height={0}
  className="w-full h-full object-cover"
  sizes="100vw"
  priority // For above-fold images
/>
```

**Rules:**
- **Next.js Image**: Always use `next/image` component
- **Priority loading**: Set `priority={true}` for above-fold images
- **Sizing**: Use `width={0} height={0}` with `sizes="100vw"` for responsive
- **Object fit**: Use `object-cover` for consistent aspect ratios
- **Asset paths**: All images in `/public/` directory

### **8. URL Parameters & Guest Names**
```tsx
// ✅ CORRECT: Guest name extraction
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const guest = searchParams.get("guest");
const guestName = guest ? decodeURIComponent(guest) : "Honored Guest";
```

**Rules:**
- **URL structure**: `/?guest=John+Doe` for personalized greetings
- **Extraction**: Use `useSearchParams()` hook
- **Decoding**: Apply `decodeURIComponent()` for special characters
- **Fallback**: Show generic greeting if no guest parameter

### **9. Form Handling & Validation**
```tsx
// ✅ CORRECT: Form submission pattern
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { error } = await supabase.from("rsvp").insert({
      name: formData.name,
      guest_count: formData.guestCount,
      attendance: formData.attendance
    });
    
    if (error) throw error;
    setShowSuccess(true);
  } catch (error) {
    setError("Failed to submit RSVP");
  } finally {
    setIsLoading(false);
  }
};
```

**Rules:**
- **RSVP constraints**: Guest count (1 or 2), attendance (hadir/tidak)
- **Required fields**: Name, guest count, attendance for RSVP
- **Success feedback**: Show confirmation messages after submission
- **Error handling**: Display user-friendly error messages
- **Loading states**: Show loading indicators during submission

### **10. Admin Dashboard Rules**
```tsx
// ✅ CORRECT: Admin authentication pattern
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  if (password === "uchamail2025") {
    setIsAuthenticated(true);
    loadData();
  } else {
    alert("Invalid password");
  }
};
```

**Rules:**
- **Authentication**: Simple password protection (`uchamail2025`)
- **Data export**: CSV export functionality for RSVPs and blessings
- **Real-time stats**: Calculate attendance ratios and guest counts
- **Blessing moderation**: Toggle approval status for public display
- **Refresh capability**: Manual data refresh with loading states

### **11. Performance & SEO Rules**
```tsx
// ✅ CORRECT: Metadata configuration
export const metadata: Metadata = {
  title: "The Wedding of Ucha & Ismail",
  description: "Join us in celebrating the wedding of Salsabila Azzahra & Ismail Abdan Syakuro Firmansyah on September 6, 2025",
  openGraph: {
    title: "The Wedding of Ucha & Ismail",
    description: "Join us in celebrating our special day - September 6, 2025",
    type: "website",
    images: ["/banner.jpg"],
  },
};
```

**Rules:**
- **Lazy loading**: Implement for gallery images and non-critical content
- **Meta tags**: Include Open Graph and wedding-specific metadata
- **Image optimization**: Compress and optimize all wedding photos
- **Bundle optimization**: Use dynamic imports for heavy components
- **Smooth scrolling**: Configure Lenis with optimized easing curves

### **12. Development Workflow Rules**
```bash
# ✅ CORRECT: Development commands
npm run dev  # Runs on port 3001 with Turbopack
npm run build
npm run start
```

**Rules:**
- **Dev server**: Run on port 3001 (3000 often occupied)
- **Turbopack**: Use `--turbopack` flag for faster development builds
- **Environment variables**: Supabase URL and keys in `.env.local`
- **Git workflow**: Commit frequently with descriptive messages
- **Testing**: Test on multiple devices and browsers before deployment

### **13. Content & Translation Management**
```json
// ✅ CORRECT: Translation file structure
{
  "intro": {
    "title": "The wedding of Ucha & Ismail",
    "greeting": "Kepada Yth.",
    "openButton": "Buka Undangan"
  },
  "banner": {
    "title": "The wedding of <br /> Ucha & Ismail",
    "description": "Assalamu'alaikum Wr. Wb..."
  }
}
```

**Rules:**
- **Hardcoded content**: Avoid hardcoding, use translation files
- **Date formatting**: Use Indonesian locale for date displays
- **Bank details**: Ensure accurate account numbers for gift section
- **Social media**: Verify Instagram handles and external links
- **Google Maps**: Use short URLs for location links

### **14. Error Handling & Debugging**
```tsx
// ✅ CORRECT: Error handling pattern
try {
  console.log('Starting operation:', operationName);
  const result = await riskyOperation();
  console.log('Operation successful:', result);
} catch (error) {
  console.error('Operation failed:', error);
  setError('User-friendly error message');
}
```

**Rules:**
- **Console logging**: Use descriptive console.log messages for debugging
- **Error boundaries**: Implement for critical sections
- **Fallback UI**: Provide graceful degradation for failed features
- **Network errors**: Handle offline scenarios gracefully
- **Audio errors**: Expected 404 for missing audio files

### **15. Deployment & Production Rules**
```bash
# ✅ CORRECT: Deployment preparation
vercel --prod
# Environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

**Rules:**
- **Environment setup**: Configure production Supabase environment
- **Build optimization**: Ensure clean production builds
- **Domain configuration**: Set up custom domain if required
- **SSL certificates**: Automatic with Vercel deployment
- **Performance monitoring**: Monitor Core Web Vitals post-deployment

## 🎯 **Quick Reference Checklist**

### **Before Starting Any Task:**
- [ ] Check current project structure and existing implementations
- [ ] Verify translation files are updated for new content
- [ ] Ensure responsive design works on both mobile and desktop
- [ ] Test animations and smooth scrolling functionality

### **Before Committing Code:**
- [ ] All animations use the custom Anim component
- [ ] Language switching works correctly
- [ ] Mobile-first responsive design is maintained
- [ ] Database operations include proper error handling
- [ ] Images use Next.js Image component with proper optimization

### **Before Deployment:**
- [ ] All environment variables are configured
- [ ] Build process completes without errors
- [ ] Cross-browser compatibility tested
- [ ] Mobile device testing completed
- [ ] Performance audit passed

---

**These rules ensure consistent, high-quality development aligned with the project's architecture and requirements. Follow these guidelines strictly when working on any aspect of this wedding invitation website.**