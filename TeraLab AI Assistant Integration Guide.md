# 🤖 TeraLab AI Assistant Integration Guide

## 📋 Prerequisites

Before implementing the AI assistant, ensure you have:

- **Next.js 15.4.5+** project setup
- **TypeScript** configured
- **Tailwind CSS** installed
- **OpenAI API** access
- **Stripe** account for payments
- **Calendly** account for booking

## 🚀 Quick Setup (30 minutes)

### 1. Install Dependencies

```bash
npm install openai stripe @stripe/stripe-js
npm install pdfkit @types/pdfkit
npm install lucide-react framer-motion
npm install @radix-ui/react-dialog
npm install papaparse @types/papaparse
```

### 2. Environment Configuration

Create `.env.local` with:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Calendly
CALENDLY_API_KEY=...
CALENDLY_EVENT_TYPE_URI=...

# Email
EMAIL_API_KEY=...
FROM_EMAIL=noreply@teralab.io
```

### 3. Add Components to Your Project

#### Copy the main AI assistant component:
- `components/AIAssistant.tsx` (from first artifact)
- `components/AIPopupWrapper.tsx` (from second artifact)

#### Add API routes:
- `pages/api/ai/generate-plan.ts`
- `pages/api/ai/generate-pdf.ts`
- `pages/api/ai/book-consultation.ts`
- `pages/api/ai/create-payment.ts`

#### Add utility files:
- `lib/ai-config.ts`
- `lib/workshop-data.ts`
- `lib/ai-utils.ts`
- `lib/rate-limiter.ts`

### 4. Integrate with Your Layout

#### Add popup to your main layout:

```tsx
// app/layout.tsx
import AIPopupWrapper from '@/components/AIPopupWrapper';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <AIPopupWrapper />
      </body>
    </html>
  );
}
```

#### Create dedicated AI page:

```tsx
// app/ai-assistant/page.tsx
import AIAssistantPage from '@/components/AIAssistantPage';

export default function Page() {
  return <AIAssistantPage />;
}
```

## ⚙️ Advanced Configuration

### Custom Prompts

Modify the system prompt in `lib/ai-config.ts`:

```typescript
export const AI_CONFIG = {
  openai: {
    systemPrompt: `Your custom TeraLab expertise prompt here...`
  }
};
```

### Pricing Customization

Update pricing in `lib/ai-config.ts`:

```typescript
pricing: {
  'workshop-plan': 299,      // SAR
  'consultation': 99,
  'full-implementation': 2999
}
```

### Multilingual Support

The assistant supports Arabic/English by default. To add more languages:

1. Add conversation flows in `AIAssistant.tsx`
2. Update email templates in `lib/email-templates.ts`
3. Add language detection logic

### Rate Limiting

Configure rate limits in `lib/ai-config.ts`:

```typescript
rateLimits: {
  planGeneration: 5,    // per hour per IP
  pdfGeneration: 10,
  imageGeneration: 3
}
```

## 🔧 Customization Options

### 1. Conversation Flow

Modify the `conversationFlow` array in `AIAssistant.tsx`:

```typescript
const conversationFlow = [
  {
    question: "Your custom question here",
    englishQuestion: "English version",
    options: ["Option 1", "Option 2"],
    key: 'dataKey',
    multiple: false // true for multi-select
  }
];
```

### 2. Workshop Templates

Add new workshop types in `lib/workshop-data.ts`:

```typescript
export const WORKSHOP_TEMPLATES = {
  'your-custom-type': {
    minSpace: 200,
    basicEquipment: [...],
    estimatedCost: { min: 100000, max: 200000 },
    monthlyRevenue: { min: 15000, max: 30000 }
  }
};
```

### 3. Styling

Customize the appearance using Tailwind classes:

```typescript
// Change color scheme
className="bg-blue-600 hover:bg-blue-700" // Current
className="bg-green-600 hover:bg-green-700" // Custom
```

### 4. Integration Points

#### Payment Integration:

```typescript
// In your payment handler
const session = await stripe.checkout.sessions.create({
  // Your custom payment configuration
  success_url: `${process.env.DOMAIN}/success`,
  cancel_url: `${process.env.DOMAIN}/ai-assistant`
});
```

#### Booking Integration:

```typescript
// Custom booking system instead of Calendly
const booking = await customBookingAPI.create({
  workshopData,
  userEmail,
  timeSlot
});
```

## 📊 Analytics & Monitoring

### Track User Interactions

```typescript
// Add to your AI