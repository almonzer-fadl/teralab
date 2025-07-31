# TeraLab Technical Documentation

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Component Specifications](#component-specifications)
3. [Content Management](#content-management)
4. [Internationalization](#internationalization)
5. [Performance Specifications](#performance-specifications)
6. [Security Considerations](#security-considerations)
7. [Deployment Strategy](#deployment-strategy)
8. [Maintenance Procedures](#maintenance-procedures)

---

## Project Architecture

### Technology Stack Overview

#### Frontend Framework
- **Next.js 15.4.5** with App Router
- **React 19.1.0** with Server Components
- **TypeScript 5** for type safety
- **Turbopack** for development bundling

#### Styling & UI Framework
- **Tailwind CSS 4.0** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon system

#### Animation & Interaction
- **Framer Motion** - Animation library
- **Motion** - Advanced motion components
- **CSS Transitions** - Micro-interactions

#### Development Tools
- **ESLint** - Code quality enforcement
- **PostCSS** - CSS processing pipeline
- **TypeScript** - Static type checking

### File Structure Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page component
│   ├── globals.css              # Global styles and CSS variables
│   └── favicon.ico              # Site favicon
├── components/                   # React components
│   ├── sections/                # Page section components
│   │   ├── HeroSection.tsx      # Hero slider section
│   │   ├── SolutionsSection.tsx # Services showcase
│   │   ├── AboutSection.tsx     # Company information
│   │   ├── ContactSection.tsx   # Contact and booking
│   │   └── PricingSection.tsx   # Pricing methodology
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Button component variants
│   │   ├── Card.tsx             # Card component
│   │   ├── Form.tsx             # Form components
│   │   └── Modal.tsx            # Modal component
│   └── shared/                  # Shared components
│       ├── NavigationBar.tsx    # Main navigation
│       ├── Footer.tsx           # Site footer
│       └── WhatsAppButton.tsx   # Floating WhatsApp button
├── contexts/                    # React contexts
│   └── LanguageContext.tsx      # Language switching logic
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   ├── constants.ts             # Application constants
│   └── validations.ts           # Form validation schemas
├── types/                       # TypeScript type definitions
│   ├── index.ts                 # Main type exports
│   ├── components.ts            # Component prop types
│   └── api.ts                   # API response types
└── hooks/                       # Custom React hooks
    ├── useScrollPosition.ts     # Scroll tracking hook
    └── useLocalStorage.ts       # Local storage hook
```

---

## Component Specifications

### 1. NavigationBar Component

#### Purpose
Primary navigation component with bilingual support and mobile responsiveness.

#### Props Interface
```typescript
interface NavigationBarProps {
  className?: string;
  transparent?: boolean;
}
```

#### Features
- **Bilingual Navigation**: Arabic/English menu items
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Language Switcher**: Integrated language toggle
- **Smooth Transitions**: Hover and focus animations
- **Accessibility**: ARIA labels and keyboard navigation

#### Implementation Details
```typescript
'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const NavigationBar = ({ className, transparent = false }: NavigationBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useLanguage();
  
  // Navigation items with translations
  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/solutions', label: t('nav.solutions') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/pricing', label: t('nav.pricing') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      transparent ? 'bg-transparent' : 'bg-black/90 backdrop-blur-sm'
    } ${className}`}>
      {/* Navigation content */}
    </nav>
  );
};
```

### 2. HeroSection Component

#### Purpose
Full-screen hero slider showcasing TeraLab services with auto-advancing slides.

#### Features
- **Auto-advancing Slides**: 3-second intervals
- **Touch/Swipe Support**: Mobile gesture navigation
- **Keyboard Navigation**: Arrow key support
- **Accessibility**: Screen reader support
- **Performance**: Lazy loading for images

#### Slide Data Structure
```typescript
interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: t('hero.slide1.title'),
    subtitle: t('hero.slide1.subtitle'),
    description: t('hero.slide1.description'),
    backgroundImage: '/images/hero/strategic-consulting.jpg',
    ctaText: t('hero.slide1.cta'),
    ctaLink: '/solutions#consulting'
  },
  // Additional slides...
];
```

### 3. SolutionsSection Component

#### Purpose
Showcase TeraLab services with expandable sections and interactive cards.

#### Service Categories
1. **Strategic Planning** - Business analysis and market research
2. **Training Programs** - Staff development and operational training
3. **Implementation** - Workshop construction and setup
4. **Marketing** - Digital and traditional marketing solutions
5. **Equipment** - Procurement and installation services

#### Component Structure
```typescript
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  duration: string;
  priceRange: string;
}

const SolutionsSection = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          {t('solutions.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedService === service.id}
              onToggle={() => setExpandedService(
                expandedService === service.id ? null : service.id
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 4. ContactSection Component

#### Purpose
Appointment booking form with consultation type selection and time slot booking.

#### Form Features
- **Consultation Type**: In-person (Saudi Arabia) or Online (Global)
- **Time Slot Selection**: 30-45 minute appointment slots
- **Service Selection**: Dropdown for specific service categories
- **Contact Information**: Name, email, phone, company
- **Message Field**: Additional requirements or questions
- **Form Validation**: Client-side validation with error handling

#### Form Data Structure
```typescript
interface AppointmentForm {
  consultationType: 'in-person' | 'online';
  serviceCategory: string;
  preferredDate: string;
  preferredTime: string;
  duration: '30' | '45';
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  message?: string;
  location?: string; // For in-person consultations
}
```

### 5. WhatsAppButton Component

#### Purpose
Floating action button for direct WhatsApp communication with pre-filled messages.

#### Features
- **Floating Position**: Fixed bottom-right corner
- **Pre-filled Message**: Includes service interest and contact info
- **Responsive**: Hidden on mobile when keyboard is active
- **Animation**: Smooth hover and click animations
- **Accessibility**: ARIA labels and keyboard support

#### Implementation
```typescript
const WhatsAppButton = () => {
  const { t, locale } = useLanguage();
  
  const generateWhatsAppMessage = () => {
    const baseMessage = t('whatsapp.baseMessage');
    const serviceInterest = t('whatsapp.serviceInterest');
    return encodeURIComponent(`${baseMessage} ${serviceInterest}`);
  };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label={t('whatsapp.ariaLabel')}
    >
      <WhatsApp className="w-6 h-6" />
    </a>
  );
};
```

---

## Content Management

### Internationalization (i18n)

#### Translation File Structure
```json
{
  "nav": {
    "home": "Home",
    "solutions": "Solutions",
    "about": "About",
    "contact": "Contact",
    "pricing": "Pricing"
  },
  "hero": {
    "slide1": {
      "title": "Strategic Auto Repair Consulting",
      "subtitle": "Transform Your Workshop",
      "description": "Expert guidance for auto repair shop success",
      "cta": "Explore Solutions"
    }
  },
  "solutions": {
    "title": "Our Solutions",
    "consulting": {
      "title": "Strategic Planning",
      "description": "Business analysis and market research",
      "features": [
        "Market analysis",
        "Business planning",
        "Financial modeling"
      ]
    }
  },
  "contact": {
    "title": "Book Your Consultation",
    "form": {
      "consultationType": "Consultation Type",
      "inPerson": "In-Person (Saudi Arabia)",
      "online": "Online (Global)",
      "serviceCategory": "Service Category",
      "preferredDate": "Preferred Date",
      "preferredTime": "Preferred Time",
      "duration": "Duration",
      "contactInfo": "Contact Information",
      "submit": "Book Appointment"
    }
  }
}
```

#### Arabic Translation Considerations
- **RTL Support**: Proper text direction and layout
- **Formal Business Arabic**: Professional terminology
- **Cultural Adaptation**: Appropriate greetings and expressions
- **Number Formatting**: Arabic numeral system support

### Content Strategy

#### Hero Section Content
1. **Strategic Consulting** - "Transform Your Auto Repair Business"
2. **Training Programs** - "Expert Staff Development"
3. **Implementation** - "Complete Workshop Solutions"

#### Service Descriptions
- **Strategic Planning**: Market analysis, business planning, financial modeling
- **Training Programs**: Staff development, operational procedures, customer service
- **Implementation**: Workshop design, equipment procurement, setup assistance
- **Marketing**: Digital marketing, traditional advertising, brand development
- **Equipment**: Sourcing, installation, maintenance training

---

## Performance Specifications

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies

#### Image Optimization
```typescript
import Image from 'next/image';

const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    width={800}
    height={600}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
    {...props}
  />
);
```

#### Code Splitting
```typescript
// Lazy load non-critical components
const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded" />,
  ssr: false
});
```

#### Bundle Optimization
- Tree shaking for unused code
- Dynamic imports for route-based splitting
- Optimized third-party library imports

### Caching Strategy
- **Static Assets**: 1 year cache for images and fonts
- **JavaScript**: 1 week cache with versioning
- **CSS**: 1 week cache with content hashing
- **API Responses**: 5 minutes cache for dynamic content

---

## Security Considerations

### Form Security
- **CSRF Protection**: Next.js built-in CSRF tokens
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Sanitized user inputs
- **Rate Limiting**: API route protection

### Environment Variables
```env
# Public variables (client-side)
NEXT_PUBLIC_SITE_URL=https://teralab.io
NEXT_PUBLIC_WHATSAPP_NUMBER=+966XXXXXXXXX

# Private variables (server-side only)
DATABASE_URL=your_database_url
SMTP_HOST=your_smtp_host
SMTP_PASSWORD=your_smtp_password
```

### Content Security Policy
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};
```

---

## Deployment Strategy

### Production Environment
- **Platform**: Vercel (recommended) or Netlify
- **Domain**: teralab.io
- **SSL**: Automatic HTTPS with Let's Encrypt
- **CDN**: Global content delivery network

### Environment Setup
```bash
# Production build
npm run build

# Environment variables
NEXT_PUBLIC_SITE_URL=https://teralab.io
NEXT_PUBLIC_WHATSAPP_NUMBER=+966XXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=info@teralab.io

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Monitoring & Analytics
- **Performance Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry integration
- **User Analytics**: Google Analytics 4
- **Uptime Monitoring**: Status page integration

---

## Maintenance Procedures

### Regular Maintenance Tasks

#### Weekly
- Performance monitoring review
- Error log analysis
- Content updates verification

#### Monthly
- Security updates and patches
- Dependency updates
- Analytics report review
- Backup verification

#### Quarterly
- Full security audit
- Performance optimization review
- Content strategy updates
- SEO performance analysis

### Update Procedures

#### Content Updates
1. Update translation files in `messages/`
2. Test bilingual functionality
3. Verify RTL layout for Arabic
4. Deploy to staging environment
5. Final review and production deployment

#### Code Updates
1. Create feature branch from main
2. Implement changes with tests
3. Code review and approval
4. Staging environment testing
5. Production deployment with rollback plan

### Backup Strategy
- **Code Repository**: Git version control
- **Content**: Translation files and static assets
- **Configuration**: Environment variables and settings
- **Database**: Regular automated backups (if applicable)

---

## Quality Assurance

### Testing Strategy

#### Unit Tests
```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  it('renders navigation items correctly', () => {
    render(<NavigationBar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
  });
});
```

#### Integration Tests
- Form submission testing
- Language switching functionality
- Responsive design verification
- Accessibility compliance

#### E2E Tests
- User journey testing
- Cross-browser compatibility
- Mobile device testing
- Performance benchmarking

### Accessibility Standards
- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** requirements
- **Focus management** for modals and forms

---

## Support & Documentation

### Developer Resources
- **API Documentation**: Component prop interfaces
- **Style Guide**: Design system and component usage
- **Deployment Guide**: Production deployment procedures
- **Troubleshooting**: Common issues and solutions

### Client Resources
- **User Guide**: Website navigation and features
- **FAQ**: Common questions and answers
- **Contact Information**: Support channels and response times
- **Service Documentation**: Detailed service descriptions

---

*This documentation is maintained by the TeraLab development team and should be updated with any architectural or functional changes to the application.*

**Last Updated**: [Current Date]  
**Version**: 1.0.0  
**Maintained By**: TeraLab Development Team 