

# 📘 **TeraLab Technical Documentation**

**Version:** 1.1
**Maintained By:** TeraLab Development Team
**Updated:** \[Current Date]

---

## **Table of Contents**

1. Project Architecture
2. Component Specifications
3. AI Workflow Overview
4. Content Management
5. Internationalization
6. Performance Specifications
7. Security Considerations
8. Deployment Strategy
9. Maintenance Procedures
10. Service List (Reference)

---

## 1. Project Architecture

### Technology Stack

| Layer               | Technology                                          |
| ------------------- | --------------------------------------------------- |
| Frontend            | Next.js 15.4.5, React 19, TypeScript 5              |
| Styling             | Tailwind CSS 4.0, shadcn/ui, Radix UI, Lucide Icons |
| Animations          | Framer Motion, CSS Transitions                      |
| Backend (API)       | Next.js API Routes (Node.js 18+)                    |
| AI Services         | OpenAI GPT-4, DALL·E / Stable Diffusion             |
| Payments            | Stripe API                                          |
| Booking             | Calendly / Custom Bookings API                      |
| Database (optional) | Supabase / PostgreSQL (future expansion)            |

### Directory Structure

```
src/
├── app/                 
├── components/          
│   ├── sections/       
│   ├── ui/             
│   └── shared/         
├── contexts/           
├── lib/                
├── hooks/              
├── types/              
├── messages/           
├── public/             
└── pages/api/          
```

---

## 2. Component Specifications

### ► `AIAssistant.tsx`

**Purpose:** Main entry for the SaaS AI experience.

**Key Functions:**

* Conversation flow logic
* Branching based on service type
* Triggers: plan creation, image generation, payment, booking

**Props Example:**

```ts
interface AIAssistantProps {
  defaultLanguage: 'ar' | 'en';
  userId?: string;
}
```

### ► `SolutionsSection.tsx`

Displays all 24 services as cards using data pulled from `/lib/constants.ts`.

```ts
interface Service {
  id: number;
  title: string;
  intro: string;
  type: 'AI' | 'Field' | 'Consulting';
  priceModel: 'Fixed' | 'Estimate' | 'Custom';
}
```

---

## 3. AI Workflow Overview

**Step 1 – Collect Basic Info**

* User selects: *Build Workshop / One-Time Service / Consulting*
* AI asks targeted questions

**Step 2 – Process**

* GPT-4 generates plan text
* DALL·E generates workshop images
* Outputs are packaged as PDF + JPG

**Step 3 – Payment Handling**

* Stripe Checkout session opens
* On success → webhook → booking calendar page

**Step 4 – Booking**

* Calendly API called → slot selection
* Confirmation email with Google/Zoom meeting link

---

## 4. Content Management

* Translation files `messages/en.json` & `messages/ar.json`
* Services data stored in `lib/constants.ts`
* Service list editable as JSON for fast updates
* Images and media uploaded under `/public`

---

## 5. Internationalization

* Uses `next-intl` package
* RTL styling applied automatically if locale = `ar`
* All components must wrap text with `<FormattedMessage />`

---

## 6. Performance Specifications

| Metric | Target                     |
| ------ | -------------------------- |
| LCP    | < 2.5s                     |
| FID    | < 100ms                    |
| CLS    | < 0.1                      |
| Mobile | >90 Lighthouse Performance |

Performance is optimized via:

* Dynamic imports
* Next/Image component
* Caching policies (static assets: 1 year)

---

## 7. Security Considerations

* HTTPS enforced (HSTS)
* All POST API routes protected by CSRF
* Rate limiting: `/api/ai` → 5 req/min/IP
* User-uploaded info sanitized (XSS protection)
* Stripe keys stored in `.env.local`

---

## 8. Deployment Strategy

| Target     | Value                     |
| ---------- | ------------------------- |
| Host       | Vercel (Next.js Edge)     |
| Branch     | Main → Production         |
| Preview    | Vercel PR deployments     |
| CDN        | Vercel Edge CDN           |
| Monitoring | Sentry + Vercel Analytics |

```bash
# Build
npm run build

# Deploy
vercel --prod
```

---

## 9. Maintenance Procedures

### Weekly

* Monitor AI usage logs
* Triage user feedback
* Review service requests

### Monthly

* Update service list / pricing
* Refresh example images
* Review localization quality

### Quarterly

* Full performance audit
* NPM dependency upgrades
* UX review & improvement

---

## 10. Service Reference List (Full 24 Services)

1. AI Workshop Planning Assistant
2. Smart Appointment Booking
3. Integrated Online Payment
4. One-Time Consulting Services
5. Full Execution of Workshop Plans
6. Field Audit & Evaluation Trips
7. Staffing & Training Services
8. Equipment Procurement Agency
9. Digital Launch Package
10. AI Explainer Video & Onboarding
11. Pre-built Service Packages
12. Transparent Pricing Models
13. Tiered Access Communication
14. AI-Powered Service Recommendation
15. Multiple Access Points to AI Suite
16. Mobile Workshop Setup
17. CCTV & Behavioral Monitoring Installations
18. Night-Shift Enablement Services
19. Digital Mystery Shopper Testing
20. Google + Website Maintenance Plans
21. Workshop Loyalty Programs
22. Owner Leadership Coaching
23. Customer Feedback Survey Systems
24. Professional Quotation Design Packs

---

**End of File 2 — Technical Documentation**

---
