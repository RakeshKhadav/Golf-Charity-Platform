# Golf Charity Subscription Platform - Implementation Plan

## 🎯 Project Overview
Build a subscription-based golf platform combining performance tracking, charity giving, and monthly prize draws in **2 days** with exceptional UI/UX.

---

## 🛠 Tech Stack (Optimized for Speed & Quality)

### Core
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React / Heroicons

### Backend & Database
- **Database**: Supabase (PostgreSQL)
  - ✅ Real-time subscriptions
  - ✅ Built-in Row Level Security
  - ✅ Built-in Auth
  - ✅ Fast queries with proper indexing
  - ✅ Better for relational data than MongoDB
- **Authentication**: Supabase Auth
- **Payment**: Stripe Checkout + Webhooks
- **File Upload**: Supabase Storage (for winner proofs)

### Deployment
- **Hosting**: Vercel (new account as required)
- **Database**: Supabase (new project as required)
- **Domain**: Vercel default or custom

---

## 📊 Database Schema

### Tables Structure

```sql
-- Users (handled by Supabase Auth)
auth.users

-- User Profiles
profiles
  - id (uuid, FK to auth.users)
  - full_name (text)
  - email (text)
  - charity_id (uuid, FK to charities)
  - charity_contribution_percentage (decimal, default 10)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Subscriptions
subscriptions
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - plan_type (enum: 'monthly', 'yearly')
  - status (enum: 'active', 'cancelled', 'expired', 'past_due')
  - stripe_subscription_id (text)
  - stripe_customer_id (text)
  - current_period_start (timestamp)
  - current_period_end (timestamp)
  - cancel_at_period_end (boolean)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Golf Scores
golf_scores
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - score (integer, 1-45)
  - score_date (date)
  - created_at (timestamp)
  - updated_at (timestamp)
  
  INDEX on (user_id, score_date DESC)
  CONSTRAINT: Only keep latest 5 per user

-- Charities
charities
  - id (uuid, PK)
  - name (text)
  - slug (text, unique)
  - description (text)
  - logo_url (text)
  - cover_image_url (text)
  - website_url (text)
  - featured (boolean, default false)
  - total_raised (decimal, default 0)
  - upcoming_events (jsonb)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Draws
draws
  - id (uuid, PK)
  - draw_date (date)
  - draw_numbers (integer[], 5 numbers)
  - draw_logic (enum: 'random', 'algorithm')
  - status (enum: 'draft', 'simulated', 'published')
  - total_pool_amount (decimal)
  - five_match_pool (decimal)
  - four_match_pool (decimal)
  - three_match_pool (decimal)
  - jackpot_rollover (decimal, default 0)
  - published_at (timestamp)
  - created_at (timestamp)

-- Draw Participants (generated when draw is created)
draw_participants
  - id (uuid, PK)
  - draw_id (uuid, FK to draws)
  - user_id (uuid, FK to auth.users)
  - user_numbers (integer[], 5 scores)
  - matches_count (integer, 0-5)
  - prize_tier (enum: 'none', 'three_match', 'four_match', 'five_match')
  - prize_amount (decimal)
  - created_at (timestamp)

-- Winners
winners
  - id (uuid, PK)
  - draw_id (uuid, FK to draws)
  - draw_participant_id (uuid, FK to draw_participants)
  - user_id (uuid, FK to auth.users)
  - prize_tier (enum: 'three_match', 'four_match', 'five_match')
  - prize_amount (decimal)
  - verification_status (enum: 'pending', 'approved', 'rejected')
  - proof_image_url (text)
  - payment_status (enum: 'pending', 'paid')
  - payment_date (timestamp)
  - notes (text)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Charity Contributions (tracking)
charity_contributions
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - charity_id (uuid, FK to charities)
  - subscription_id (uuid, FK to subscriptions)
  - amount (decimal)
  - contribution_date (timestamp)
  - created_at (timestamp)

-- Independent Donations (optional donations)
independent_donations
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users, nullable)
  - charity_id (uuid, FK to charities)
  - amount (decimal)
  - stripe_payment_intent_id (text)
  - donor_name (text)
  - donor_email (text)
  - status (enum: 'pending', 'completed', 'failed')
  - created_at (timestamp)
```

---

## 🗂 Project Structure

```
golf-charity-platform/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── scores/
│   │   ├── charity/
│   │   └── winnings/
│   ├── (admin)/
│   │   └── admin/
│   │       ├── users/
│   │       ├── draws/
│   │       ├── charities/
│   │       ├── winners/
│   │       └── analytics/
│   ├── (public)/
│   │   ├── page.tsx (homepage)
│   │   ├── charities/
│   │   ├── how-it-works/
│   │   └── subscribe/
│   ├── api/
│   │   ├── auth/
│   │   ├── subscriptions/
│   │   ├── scores/
│   │   ├── draws/
│   │   ├── webhooks/
│   │   │   └── stripe/
│   │   └── admin/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── auth/
│   ├── dashboard/
│   ├── admin/
│   ├── landing/
│   ├── charity/
│   └── animations/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── database.types.ts (generated from Supabase)
├── hooks/
│   ├── useUser.ts
│   ├── useSubscription.ts
│   └── useScores.ts
└── public/
    └── images/
```

---

## 📅 2-Day Implementation Timeline

### **Day 1: Foundation & Core Features (12 hours)**

#### Hour 1-2: Setup & Database
- [ ] Create new Vercel account
- [ ] Create new Supabase project
- [ ] Initialize Next.js 14 project with TypeScript + Tailwind
- [ ] Set up all database tables with RLS policies
- [ ] Configure Supabase Auth
- [ ] Set up environment variables

#### Hour 3-4: Authentication & Landing Page
- [ ] Build signup/login pages with Supabase Auth
- [ ] Create hero section with CTA
- [ ] Add "How It Works" section
- [ ] Add charity impact showcase
- [ ] Implement responsive navigation

#### Hour 5-6: Subscription System
- [ ] Set up Stripe account and products
- [ ] Create subscription plans (monthly/yearly)
- [ ] Build subscription checkout flow
- [ ] Implement Stripe webhook handler
- [ ] Create subscription status middleware

#### Hour 7-8: Score Management
- [ ] Build score entry form
- [ ] Implement 5-score rolling window logic
- [ ] Create score display component
- [ ] Add score edit functionality
- [ ] Validate score range (1-45)

#### Hour 9-10: User Dashboard
- [ ] Create dashboard layout
- [ ] Build subscription status widget
- [ ] Add score management section
- [ ] Show selected charity and contribution
- [ ] Display participation summary

#### Hour 11-12: Charity System
- [ ] Create charities listing page
- [ ] Build individual charity profile pages
- [ ] Add charity selection in signup/settings
- [ ] Implement search and filter
- [ ] Create featured charity section

---

### **Day 2: Advanced Features & Polish (12 hours)**

#### Hour 1-3: Draw System (Most Complex)
- [ ] Design draw engine algorithm
- [ ] Create draw configuration admin page
- [ ] Implement random number generation
- [ ] Build draw simulation mode
- [ ] Create draw results display
- [ ] Implement prize pool calculation logic
- [ ] Add jackpot rollover mechanism

#### Hour 4-5: Winner Verification
- [ ] Build winner verification flow
- [ ] Create proof upload component (Supabase Storage)
- [ ] Add admin verification interface
- [ ] Implement payment status tracking
- [ ] Create winner notifications

#### Hour 6-8: Admin Dashboard
- [ ] User management (view, edit, manage subscriptions)
- [ ] Draw management (configure, simulate, publish)
- [ ] Charity management (CRUD operations)
- [ ] Winners management (verify, mark paid)
- [ ] Analytics dashboard (users, pool, contributions, stats)

#### Hour 9-10: UI/UX Polish
- [ ] Add Framer Motion animations
- [ ] Implement micro-interactions
- [ ] Optimize images and assets
- [ ] Add loading states
- [ ] Polish responsive design
- [ ] Add error boundaries

#### Hour 11: Testing & Deployment
- [ ] Run through entire user flow
- [ ] Test subscription + payment
- [ ] Test score entry and draw logic
- [ ] Test admin functions
- [ ] Verify mobile responsiveness
- [ ] Deploy to Vercel
- [ ] Test production environment

#### Hour 12: Documentation & Final Touches
- [ ] Create test user credentials
- [ ] Create admin credentials
- [ ] Document environment variables
- [ ] Add README with setup instructions
- [ ] Final QA pass

---

## 🎨 Key Implementation Details

### Authentication Flow
```typescript
// Signup → Create profile → Redirect to subscription selection
// Login → Check subscription status → Redirect accordingly
// Protected routes → Middleware checks auth + subscription
```

### Score Logic (Critical)
```typescript
// When adding new score:
// 1. Get user's current scores ordered by date DESC
// 2. If count >= 5, delete oldest
// 3. Insert new score
// 4. This ensures only latest 5 are kept

// Trigger/Function approach for automatic cleanup:
CREATE FUNCTION enforce_score_limit()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM golf_scores
  WHERE user_id = NEW.user_id
  AND id NOT IN (
    SELECT id FROM golf_scores
    WHERE user_id = NEW.user_id
    ORDER BY score_date DESC, created_at DESC
    LIMIT 5
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Draw Engine Logic
```typescript
// Monthly draw process:
// 1. Admin creates draw (draft status)
// 2. Generate 5 random numbers (1-45) OR use algorithm
// 3. For each active subscriber:
//    - Get their 5 latest scores
//    - Check how many match the draw numbers
//    - Create draw_participant record
// 4. Calculate prize pools based on subscription count
// 5. Simulate → Review → Publish
// 6. Create winner records for 3+ matches
// 7. Send notifications

// Algorithm option (weighted):
// - Analyze frequency of scores across all users
// - Weight toward most/least common scores
```

### Stripe Integration
```typescript
// Subscription creation:
// 1. Create Stripe customer
// 2. Create Stripe checkout session
// 3. Redirect to Stripe
// 4. Webhook confirms payment
// 5. Create subscription record

// Webhook events to handle:
// - checkout.session.completed
// - customer.subscription.created
// - customer.subscription.updated
// - customer.subscription.deleted
// - invoice.payment_succeeded
// - invoice.payment_failed
```

---

## 🚨 Critical Success Factors

### Must-Have for Evaluation
1. ✅ **Working subscription flow** with real Stripe test mode
2. ✅ **Score rolling window** working perfectly
3. ✅ **Draw system** functional (random at minimum)
4. ✅ **Admin panel** fully operational
5. ✅ **Outstanding UI** that stands out
6. ✅ **Mobile responsive** everywhere
7. ✅ **Fast performance** (<3s page loads)

### Edge Cases to Handle
- User tries to enter 6th score → Should replace oldest
- Draw with no 5-match winner → Jackpot rolls over
- Multiple winners in same tier → Split prize equally
- Subscription expires → Lock access but preserve data
- User cancels → Access until period end
- Admin edits user scores → Recalculate draw participation

### Performance Optimizations
- Use Next.js Image component for all images
- Implement lazy loading for charity listings
- Cache static content (charities, how-it-works)
- Optimize Supabase queries with indexes
- Use Server Components where possible
- Minimize client-side JavaScript

---

## 📝 Testing Checklist

### User Flow
- [ ] Signup → Subscribe → Enter scores → View dashboard
- [ ] Change charity selection
- [ ] Edit existing scores
- [ ] View draw results
- [ ] Upload winner proof
- [ ] Independent donation

### Admin Flow
- [ ] Create new charity
- [ ] Edit user profile and scores
- [ ] Configure and run draw simulation
- [ ] Publish draw results
- [ ] Verify winner submission
- [ ] Mark payout as complete
- [ ] View analytics

### Edge Cases
- [ ] Expired subscription behavior
- [ ] Cancelled subscription with time remaining
- [ ] 6th score entry (should replace oldest)
- [ ] Draw with zero 5-match winners (rollover)
- [ ] Multiple winners splitting prize
- [ ] Charity contribution calculation accuracy

---

## 🎯 Deliverables Checklist

- [ ] Live website URL (Vercel deployment)
- [ ] User test credentials with active subscription
- [ ] Admin test credentials with full access
- [ ] GitHub repository with clean code
- [ ] README with setup instructions
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] Working subscription flow
- [ ] Functional draw system
- [ ] Complete admin panel
- [ ] Mobile responsive design

---

## 💡 Pro Tips for 2-Day Sprint

1. **Use shadcn/ui** for pre-built components (saves hours)
2. **Don't build from scratch** what exists (Stripe Checkout, Supabase Auth)
3. **Focus on core logic first**, polish later
4. **Test Stripe in test mode** throughout development
5. **Deploy early and often** to catch production issues
6. **Use Supabase Studio** for quick database testing
7. **Keep scope tight** - if a feature is ambiguous, choose simplest interpretation
8. **Document as you go** - add comments for complex logic
9. **Mobile-first** - easier to scale up than down
10. **Animations last** - get functionality working first

---

## 🚀 Quick Start Commands

```bash
# Initialize project
npx create-next-app@latest golf-charity-platform --typescript --tailwind --app

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install stripe @stripe/stripe-js
npm install framer-motion lucide-react
npm install date-fns zod react-hook-form @hookform/resolvers
npm install recharts (for analytics charts)

# Development
npm run dev

# Build
npm run build

# Deploy
vercel --prod
```

---

## 📞 When Stuck

**Priority Order:**
1. Check Supabase logs for database errors
2. Check Stripe dashboard for webhook failures
3. Check Vercel deployment logs
4. Console.log everything in development
5. Test in incognito mode (auth issues)

**Common Pitfalls:**
- RLS policies blocking queries → Check Supabase auth context
- Stripe webhooks not firing → Check endpoint URL + signing secret
- Scores not rolling → Check trigger function
- Draw calculations wrong → Console.log each step
- Hydration errors → Ensure server/client components are correct

---

## 🎓 Key Learning Outcomes

This project demonstrates:
- Complex business logic (draw engine, rolling scores)
- Payment integration (Stripe subscriptions)
- Multi-role system (public, user, admin)
- Real-time data with Supabase
- Production-ready architecture
- Outstanding UI/UX execution

**Good luck! You've got this! 🚀**
