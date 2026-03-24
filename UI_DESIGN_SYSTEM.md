# Golf Charity Platform - UI/UX Design System
**Version 1.0 | March 2026**

## 🎨 Design Philosophy

### Core Principle: Impact First, Sport Second
This platform is NOT a golf website. It's a charity platform that happens to use golf scores. The design should feel like a modern fintech/giving platform, not a country club.

### Emotional Drivers
1. **Hope** - Every score entered helps someone
2. **Community** - Part of something bigger
3. **Transparency** - See exactly where money goes
4. **Excitement** - The thrill of potential winning
5. **Simplicity** - Remove friction from giving

### Design Personality
- **Modern**: Clean lines, contemporary aesthetics
- **Trustworthy**: Financial-grade polish and professionalism  
- **Warm**: Human-centered, not corporate cold
- **Sophisticated**: Premium feel without being stuffy
- **Playful (subtle)**: Micro-delights, not childish

### What to AVOID
❌ Golf course imagery as primary visual language  
❌ Green grass textures and fairway backgrounds  
❌ Plaid patterns and traditional golf aesthetics  
❌ Club/ball/flag icons as main navigation elements  
❌ Country club color palettes (hunter green, khaki, burgundy)  
❌ Overly sporty or athletic design language

---

## 🎨 Color System

### Primary Palette

```css
/* Primary - Deep Ocean Blue (Trust, Stability) */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;  /* Main primary */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
--primary-950: #172554;

/* Secondary - Vibrant Teal (Growth, Impact) */
--secondary-50: #f0fdfa;
--secondary-100: #ccfbf1;
--secondary-200: #99f6e4;
--secondary-300: #5eead4;
--secondary-400: #2dd4bf;
--secondary-500: #14b8a6;  /* Main secondary */
--secondary-600: #0d9488;
--secondary-700: #0f766e;
--secondary-800: #115e59;
--secondary-900: #134e4a;

/* Accent - Warm Orange (Excitement, Winning) */
--accent-50: #fff7ed;
--accent-100: #ffedd5;
--accent-200: #fed7aa;
--accent-300: #fdba74;
--accent-400: #fb923c;
--accent-500: #f97316;  /* Main accent */
--accent-600: #ea580c;
--accent-700: #c2410c;
--accent-800: #9a3412;
--accent-900: #7c2d12;
```

### Neutral Palette

```css
/* Neutrals - Cool Gray (Modern, Clean) */
--neutral-50: #f8fafc;
--neutral-100: #f1f5f9;
--neutral-200: #e2e8f0;
--neutral-300: #cbd5e1;
--neutral-400: #94a3b8;
--neutral-500: #64748b;
--neutral-600: #475569;
--neutral-700: #334155;
--neutral-800: #1e293b;
--neutral-900: #0f172a;
--neutral-950: #020617;
```

### Semantic Colors

```css
/* Success - Charity Impact */
--success-light: #d1fae5;
--success: #10b981;
--success-dark: #065f46;

/* Warning - Attention Needed */
--warning-light: #fef3c7;
--warning: #f59e0b;
--warning-dark: #92400e;

/* Error - Critical States */
--error-light: #fee2e2;
--error: #ef4444;
--error-dark: #991b1b;

/* Info - System Messages */
--info-light: #dbeafe;
--info: #3b82f6;
--info-dark: #1e40af;
```

### Usage Guidelines

**Primary Blue** - Main CTAs, navigation, subscription actions  
**Secondary Teal** - Charity-related elements, impact metrics, donation flows  
**Accent Orange** - Winners, prizes, jackpots, celebration moments  
**Neutrals** - Text, backgrounds, borders, cards

---

## 📝 Typography

### Font Families

```css
/* Primary Font - Inter (Modern, Professional) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Accent Font - Cal Sans (Headlines only) */
--font-accent: 'Cal Sans', 'Inter', sans-serif;

/* Monospace - Jetbrains Mono (Numbers, Scores) */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale

```css
/* Headings */
--text-6xl: 3.75rem;    /* 60px - Hero headlines */
--text-5xl: 3rem;       /* 48px - Page titles */
--text-4xl: 2.25rem;    /* 36px - Section headers */
--text-3xl: 1.875rem;   /* 30px - Card titles */
--text-2xl: 1.5rem;     /* 24px - Subsections */
--text-xl: 1.25rem;     /* 20px - Large body */

/* Body */
--text-base: 1rem;      /* 16px - Default body */
--text-sm: 0.875rem;    /* 14px - Secondary text */
--text-xs: 0.75rem;     /* 12px - Captions */

/* Line Heights */
--leading-tight: 1.25;   /* Headlines */
--leading-snug: 1.375;   /* Subheadings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
```

### Font Weights

```css
--font-light: 300;      /* Subtle emphasis */
--font-normal: 400;     /* Body text */
--font-medium: 500;     /* UI elements */
--font-semibold: 600;   /* Strong emphasis */
--font-bold: 700;       /* Headlines */
--font-black: 900;      /* Hero text (sparingly) */
```

### Typography Examples

```tsx
// Hero Headline
<h1 className="font-accent text-6xl font-bold leading-tight text-neutral-900">
  Play Golf. Change Lives.
</h1>

// Section Header
<h2 className="font-primary text-4xl font-semibold text-neutral-800">
  How It Works
</h2>

// Body Text
<p className="font-primary text-base leading-relaxed text-neutral-600">
  Every score you enter contributes to a charity of your choice...
</p>

// Small Caption
<span className="font-primary text-xs font-medium text-neutral-500">
  Registered Charity • Active since 2018
</span>

// Number Display (Scores, Prizes)
<span className="font-mono text-3xl font-bold text-primary-600">
  36
</span>
```

---

## 🧩 Component Library

### Buttons

#### Primary CTA
```tsx
<button className="
  px-6 py-3 
  bg-primary-600 hover:bg-primary-700 
  text-white font-semibold text-base
  rounded-xl
  shadow-lg shadow-primary-500/30
  hover:shadow-xl hover:shadow-primary-500/40
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]
">
  Subscribe Now
</button>
```

#### Secondary Button
```tsx
<button className="
  px-6 py-3
  bg-white hover:bg-neutral-50
  text-primary-600 font-semibold text-base
  border-2 border-primary-200
  rounded-xl
  transition-all duration-200
  hover:border-primary-300
  hover:shadow-md
">
  Learn More
</button>
```

#### Charity Action Button
```tsx
<button className="
  px-5 py-2.5
  bg-gradient-to-r from-secondary-500 to-secondary-600
  hover:from-secondary-600 hover:to-secondary-700
  text-white font-medium text-sm
  rounded-lg
  shadow-md
  transition-all duration-200
  flex items-center gap-2
">
  <HeartIcon className="w-4 h-4" />
  Select Charity
</button>
```

#### Ghost Button
```tsx
<button className="
  px-4 py-2
  text-neutral-600 hover:text-neutral-900
  font-medium text-sm
  hover:bg-neutral-100
  rounded-lg
  transition-colors duration-150
">
  Cancel
</button>
```

### Cards

#### Primary Card (Dashboard Widgets)
```tsx
<div className="
  bg-white
  border border-neutral-200
  rounded-2xl
  p-6
  shadow-sm hover:shadow-md
  transition-shadow duration-200
">
  {/* Card content */}
</div>
```

#### Elevated Card (Featured Items)
```tsx
<div className="
  bg-white
  border-2 border-primary-100
  rounded-2xl
  p-8
  shadow-xl shadow-primary-500/5
  hover:shadow-2xl hover:shadow-primary-500/10
  transition-all duration-300
  hover:-translate-y-1
">
  {/* Card content */}
</div>
```

#### Charity Card
```tsx
<div className="
  group
  bg-gradient-to-br from-white to-secondary-50/30
  border border-neutral-200
  rounded-2xl
  overflow-hidden
  hover:border-secondary-300
  transition-all duration-300
  hover:shadow-lg
">
  {/* Cover Image */}
  <div className="relative h-48 bg-neutral-200 overflow-hidden">
    <img 
      src={charity.coverImage} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {/* Featured Badge */}
    {charity.featured && (
      <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
        Featured
      </div>
    )}
  </div>
  
  {/* Card Body */}
  <div className="p-6">
    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
      {charity.name}
    </h3>
    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
      {charity.description}
    </p>
    
    {/* Impact Metric */}
    <div className="flex items-center gap-2 text-secondary-600">
      <TrendingUpIcon className="w-5 h-5" />
      <span className="font-mono text-lg font-bold">
        £{charity.totalRaised.toLocaleString()}
      </span>
      <span className="text-xs text-neutral-500">raised</span>
    </div>
  </div>
</div>
```

### Forms

#### Input Field
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Email Address
  </label>
  <input
    type="email"
    className="
      w-full px-4 py-3
      border border-neutral-300
      rounded-xl
      text-neutral-900
      placeholder:text-neutral-400
      focus:outline-none
      focus:ring-2 focus:ring-primary-500 focus:border-transparent
      transition-shadow duration-200
    "
    placeholder="you@example.com"
  />
</div>
```

#### Score Input (Special Design)
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Today's Score
  </label>
  <div className="relative">
    <input
      type="number"
      min="1"
      max="45"
      className="
        w-full px-6 py-4
        border-2 border-primary-200
        rounded-2xl
        text-center
        font-mono text-4xl font-bold
        text-primary-600
        focus:outline-none
        focus:border-primary-500
        focus:ring-4 focus:ring-primary-100
        transition-all duration-200
      "
      placeholder="36"
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
      Stableford
    </div>
  </div>
  <p className="text-xs text-neutral-500 text-center">
    Enter score between 1-45
  </p>
</div>
```

### Badges & Tags

#### Status Badge
```tsx
// Active Subscription
<span className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-success-light text-success-dark
  text-xs font-semibold
  rounded-full
">
  <CheckCircleIcon className="w-3 h-3" />
  Active
</span>

// Pending Status
<span className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-warning-light text-warning-dark
  text-xs font-semibold
  rounded-full
">
  <ClockIcon className="w-3 h-3" />
  Pending
</span>
```

#### Prize Tier Badge
```tsx
// Jackpot (5-Match)
<div className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-gradient-to-r from-accent-500 to-accent-600
  text-white
  font-bold text-sm
  rounded-lg
  shadow-lg shadow-accent-500/30
">
  <TrophyIcon className="w-5 h-5" />
  Jackpot Winner
</div>

// 4-Match
<div className="
  inline-flex items-center gap-2
  px-3 py-1.5
  bg-primary-100 text-primary-700
  font-semibold text-xs
  rounded-md
">
  4-Match Winner
</div>
```

---

## 🎭 Layout & Spacing

### Container Widths
```css
--container-sm: 640px;   /* Forms, focused content */
--container-md: 768px;   /* Single column layouts */
--container-lg: 1024px;  /* Standard pages */
--container-xl: 1280px;  /* Wide layouts, dashboards */
--container-2xl: 1536px; /* Full-width sections */
```

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Grid Systems

#### Dashboard Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Widget cards */}
</div>
```

#### Charity Listing Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Charity cards */}
</div>
```

---

## ✨ Animation Specifications

### Micro-interactions (Framer Motion)

#### Page Transitions
```tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {/* Page content */}
</motion.div>
```

#### Card Hover
```tsx
<motion.div
  whileHover={{ 
    scale: 1.02, 
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }}
  transition={{ duration: 0.2, ease: 'easeInOut' }}
>
  {/* Card content */}
</motion.div>
```

#### Button Press
```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.1 }}
>
  Click Me
</motion.button>
```

#### Number Counter (Prize Amounts, Impact Stats)
```tsx
import { useSpring, animated } from 'framer-motion';

function Counter({ value }) {
  const count = useSpring(0, {
    duration: 2000,
    bounce: 0
  });

  useEffect(() => {
    count.set(value);
  }, [value]);

  return <animated.span>{count}</animated.span>;
}
```

#### Stagger Children (Lists)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Loading States

#### Skeleton Loader
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
  <div className="h-32 bg-neutral-200 rounded"></div>
</div>
```

#### Spinner
```tsx
<div className="inline-block w-8 h-8 border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin"></div>
```

---

## 📄 Page-by-Page Design Specifications

### 1. Homepage (Landing Page)

**Goal**: Convert visitors into subscribers while emphasizing charitable impact

#### Hero Section
```tsx
<section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl">
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-200 rounded-full text-sm text-primary-600 font-medium shadow-sm mb-6"
      >
        <SparklesIcon className="w-4 h-4" />
        Supporting 50+ UK Charities
      </motion.div>

      {/* Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-accent text-6xl md:text-7xl font-bold leading-tight text-neutral-900 mb-6"
      >
        Play Golf.
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
          {' '}Change Lives.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-2xl"
      >
        Enter your golf scores, support your favourite charity, and win monthly prizes. 
        Every round you play helps make a difference.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4"
      >
        <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02]">
          Start Playing
        </button>
        <button className="px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-lg border-2 border-neutral-200 rounded-xl transition-all duration-200">
          How It Works
        </button>
      </motion.div>

      {/* Social Proof */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center gap-8 text-sm text-neutral-600"
      >
        <div>
          <div className="font-mono text-2xl font-bold text-neutral-900">
            £287,450
          </div>
          <div>Raised for Charity</div>
        </div>
        <div>
          <div className="font-mono text-2xl font-bold text-neutral-900">
            12,483
          </div>
          <div>Active Players</div>
        </div>
        <div>
          <div className="font-mono text-2xl font-bold text-neutral-900">
            £54,200
          </div>
          <div>Monthly Prize Pool</div>
        </div>
      </motion.div>
    </div>
  </div>

  {/* Decorative Elements */}
  <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
  <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20"></div>
</section>
```

#### How It Works Section
```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="font-accent text-5xl font-bold text-neutral-900 mb-4">
        Three Simple Steps
      </h2>
      <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
        No complicated rules. Just play, give, and win.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Step 1 */}
      <div className="relative">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
            <span className="font-mono text-3xl font-bold text-white">1</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Enter Your Scores
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Log your latest 5 golf scores in Stableford format. Quick and easy entry.
          </p>
        </div>
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent"></div>
      </div>

      {/* Step 2 */}
      <div className="relative">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-500/30">
            <span className="font-mono text-3xl font-bold text-white">2</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Choose Your Charity
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Select from 50+ verified UK charities. 10%+ of your subscription supports your cause.
          </p>
        </div>
        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-secondary-300 to-transparent"></div>
      </div>

      {/* Step 3 */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-500/30">
          <span className="font-mono text-3xl font-bold text-white">3</span>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
          Win Monthly Prizes
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          Automatic entry into our monthly draw. Match your scores and win cash prizes.
        </p>
      </div>
    </div>
  </div>
</section>
```

#### Charity Impact Section
```tsx
<section className="py-24 bg-gradient-to-br from-secondary-50 to-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Impact Story */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 text-secondary-700 text-sm font-semibold rounded-full mb-6">
          <HeartIcon className="w-4 h-4" />
          Real Impact
        </div>
        <h2 className="font-accent text-5xl font-bold text-neutral-900 mb-6">
          Every Score Makes a Difference
        </h2>
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          When you enter your scores, you're not just tracking your game—you're 
          funding cancer research, supporting mental health initiatives, and helping 
          communities thrive. 100% transparency. Real-time impact tracking.
        </p>

        {/* Impact Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-neutral-900">10% Minimum Donation</div>
              <div className="text-sm text-neutral-600">From every subscription</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-neutral-900">50+ UK Charities</div>
              <div className="text-sm text-neutral-600">All verified and registered</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-neutral-900">Full Transparency</div>
              <div className="text-sm text-neutral-600">See exactly where your money goes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Featured Charity Card */}
      <div className="relative">
        {/* Large featured charity card with image */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-64 bg-gradient-to-br from-secondary-400 to-secondary-600"></div>
          <div className="p-8">
            <div className="text-sm text-secondary-600 font-semibold mb-2">
              Featured This Month
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Macmillan Cancer Support
            </h3>
            <p className="text-neutral-600 mb-6">
              Supporting people living with cancer and their families.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-3xl font-bold text-neutral-900">
                  £43,201
                </div>
                <div className="text-sm text-neutral-500">Raised this year</div>
              </div>
              <button className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 2. User Dashboard

**Layout**: Sidebar navigation + main content area

#### Dashboard Header
```tsx
<div className="bg-white border-b border-neutral-200 px-6 py-4">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">
        Welcome back, {user.firstName}
      </h1>
      <p className="text-sm text-neutral-600">
        You're making a difference with every score
      </p>
    </div>
    <div className="flex items-center gap-3">
      {/* Subscription Status Badge */}
      <div className="px-4 py-2 bg-success-light text-success-dark text-sm font-semibold rounded-lg flex items-center gap-2">
        <CheckCircleIcon className="w-4 h-4" />
        Active • Renews {subscription.renewalDate}
      </div>
    </div>
  </div>
</div>
```

#### Dashboard Widgets Grid
```tsx
<div className="p-6 space-y-6">
  {/* Top Stats Row */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {/* Current Charity */}
    <div className="bg-gradient-to-br from-secondary-50 to-white border border-secondary-200 rounded-2xl p-6">
      <div className="text-sm text-secondary-600 font-medium mb-2">
        Supporting
      </div>
      <div className="text-xl font-bold text-neutral-900 mb-1">
        {charity.name}
      </div>
      <div className="flex items-center gap-2">
        <div className="font-mono text-2xl font-bold text-secondary-600">
          15%
        </div>
        <div className="text-xs text-neutral-600">of subscription</div>
      </div>
    </div>

    {/* Total Contributed */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
      <div className="text-sm text-neutral-600 font-medium mb-2">
        Total Contributed
      </div>
      <div className="font-mono text-3xl font-bold text-neutral-900">
        £127
      </div>
      <div className="text-xs text-neutral-500 mt-1">
        Since joining
      </div>
    </div>

    {/* Draws Entered */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
      <div className="text-sm text-neutral-600 font-medium mb-2">
        Draws Entered
      </div>
      <div className="font-mono text-3xl font-bold text-neutral-900">
        8
      </div>
      <div className="text-xs text-accent-600 font-medium mt-1">
        Next draw in 12 days
      </div>
    </div>

    {/* Total Winnings */}
    <div className="bg-gradient-to-br from-accent-50 to-white border border-accent-200 rounded-2xl p-6">
      <div className="text-sm text-accent-600 font-medium mb-2">
        Total Winnings
      </div>
      <div className="font-mono text-3xl font-bold text-accent-600">
        £0
      </div>
      <div className="text-xs text-neutral-500 mt-1">
        Keep playing!
      </div>
    </div>
  </div>

  {/* Score Entry Section */}
  <div className="bg-white border border-neutral-200 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
      Your Latest Scores
    </h2>
    
    {/* Score Entry Form */}
    <div className="max-w-md mb-8">
      <div className="flex gap-3">
        <input
          type="number"
          min="1"
          max="45"
          placeholder="Enter score"
          className="flex-1 px-4 py-3 border-2 border-primary-200 rounded-xl font-mono text-xl text-center focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
        />
        <input
          type="date"
          className="px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors">
          Add Score
        </button>
      </div>
      <p className="text-xs text-neutral-500 mt-2">
        Stableford format • Range: 1-45
      </p>
    </div>

    {/* Score List */}
    <div className="space-y-3">
      {scores.map((score, index) => (
        <div key={score.id} className="flex items-center justify-between py-4 px-5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="font-mono text-xl font-bold text-primary-600">
                {score.value}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-900">
                {format(score.date, 'MMMM d, yyyy')}
              </div>
              <div className="text-xs text-neutral-500">
                {index === 0 ? 'Most recent' : `${index + 1} round${index !== 0 ? 's' : ''} ago`}
              </div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-neutral-600">
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>
```

### 3. Admin Dashboard

**Layout**: Dark sidebar + light content area (professional admin feel)

#### Admin Sidebar
```tsx
<div className="w-64 h-screen bg-neutral-900 text-white fixed left-0 top-0">
  <div className="p-6 border-b border-neutral-800">
    <h2 className="text-xl font-bold">Admin Panel</h2>
    <p className="text-xs text-neutral-400 mt-1">Golf Charity Platform</p>
  </div>
  
  <nav className="p-4 space-y-1">
    {[
      { icon: LayoutDashboardIcon, label: 'Overview', path: '/admin' },
      { icon: UsersIcon, label: 'Users', path: '/admin/users' },
      { icon: TrophyIcon, label: 'Draws', path: '/admin/draws' },
      { icon: HeartIcon, label: 'Charities', path: '/admin/charities' },
      { icon: AwardIcon, label: 'Winners', path: '/admin/winners' },
      { icon: BarChartIcon, label: 'Analytics', path: '/admin/analytics' },
    ].map(item => (
      <Link
        key={item.path}
        href={item.path}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
      >
        <item.icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    ))}
  </nav>
</div>
```

#### Admin Draw Management Page
```tsx
<div className="p-8">
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
      Draw Management
    </h1>
    <p className="text-neutral-600">
      Configure, simulate, and publish monthly draws
    </p>
  </div>

  {/* Create New Draw Card */}
  <div className="bg-white border-2 border-primary-200 rounded-2xl p-8 mb-8">
    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
      Create New Draw
    </h2>
    
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Draw Logic Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Draw Logic
        </label>
        <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="random">Random Generation</option>
          <option value="algorithm">Algorithm-Weighted</option>
        </select>
      </div>

      {/* Draw Date */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Draw Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-3">
      <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold rounded-xl transition-colors">
        Simulate Draw
      </button>
      <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors">
        Generate Draft
      </button>
    </div>
  </div>

  {/* Recent Draws Table */}
  <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
    <div className="px-6 py-4 border-b border-neutral-200">
      <h3 className="text-lg font-bold text-neutral-900">
        Recent Draws
      </h3>
    </div>
    <table className="w-full">
      <thead className="bg-neutral-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Date</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Numbers</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Status</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Winners</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Prize Pool</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-200">
        {/* Table rows */}
      </tbody>
    </table>
  </div>
</div>
```

---

## 🎯 Design Principles Summary

### DO:
✅ Lead with charitable impact and human stories  
✅ Use generous whitespace and clean layouts  
✅ Implement subtle, purposeful animations  
✅ Show real-time impact metrics prominently  
✅ Make CTAs clear and conversion-optimized  
✅ Use modern, sophisticated color palette  
✅ Ensure fast, responsive performance  

### DON'T:
❌ Use golf course imagery as primary visuals  
❌ Overload with animations (keep it subtle)  
❌ Hide subscription pricing or terms  
❌ Make the charity selection feel secondary  
❌ Use outdated or generic templates  
❌ Neglect mobile-first design  

---

## 📱 Mobile Considerations

- All touch targets minimum 44x44px
- Sticky navigation on mobile
- Simplified forms with better keyboards (type="number", type="email")
- Swipe gestures for score history
- Bottom navigation for key actions
- Reduced animations on low-power devices

---

## 🚀 Performance Targets

- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Performance Score: >90
- Accessibility Score: >95

---

**This design system should result in a platform that feels:**
- ✨ Modern and fresh
- 💙 Emotionally engaging
- 🎯 Purpose-driven
- 🏆 Premium but accessible
- 💚 Charity-first, not sport-first
