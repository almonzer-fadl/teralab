import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { workshopExamples, enhancedPrompts } from '../../../lib/ai-training-data';
import { rateLimiter } from '../../../lib/rate-limiter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface WorkshopData {
  businessType: string;
  location: string;
  budget: string;
  services: string[];
  timeline: string;
  experience: string;
  spaceSize: string;
  equipmentPreference: string;
}

// Validate workshop data
function validateWorkshopData(data: any): data is WorkshopData {
  const requiredFields = ['businessType', 'location', 'budget', 'services', 'timeline', 'experience', 'spaceSize', 'equipmentPreference'];
  
  for (const field of requiredFields) {
    if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
      return false;
    }
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per hour per IP
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter.isAllowed(clientIP, 5, 3600000)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          remainingTime: '1 hour'
        },
        { status: 429 }
      );
    }

    // CSRF protection - check referer header
    const referer = request.headers.get('referer');
    if (!referer || !referer.includes(request.headers.get('host') || '')) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // Validate request body
    const body = await request.json();
    if (!validateWorkshopData(body)) {
      return NextResponse.json(
        { error: 'Invalid workshop data provided' },
        { status: 400 }
      );
    }

    const workshopData: WorkshopData = body;

    // Sanitize inputs
    const sanitizedData = {
      businessType: String(workshopData.businessType).trim().substring(0, 100),
      location: String(workshopData.location).trim().substring(0, 100),
      budget: String(workshopData.budget).trim().substring(0, 100),
      services: Array.isArray(workshopData.services) ? workshopData.services.slice(0, 10).map(s => String(s).trim().substring(0, 50)) : [],
      timeline: String(workshopData.timeline).trim().substring(0, 100),
      experience: String(workshopData.experience).trim().substring(0, 100),
      spaceSize: String(workshopData.spaceSize).trim().substring(0, 100),
      equipmentPreference: String(workshopData.equipmentPreference).trim().substring(0, 100)
    };

    // Generate comprehensive workshop plan using GPT-4 with examples
    const planCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: enhancedPrompts.systemPrompt
        },
        {
          role: "user",
          content: `Here are some successful workshop examples to learn from:

Example 1:
- Type: ورشة إصلاح عامة
- Location: السعودية - الرياض  
- Budget: 100,000 - 300,000 ريال
- ROI: 18-25%
- Monthly Revenue: 45,000 - 75,000 SAR

Example 2:
- Type: ورشة متخصصة
- Location: الإمارات - دبي
- Budget: 300,000 - 500,000 ريال
- ROI: 25-35%
- Monthly Revenue: 80,000 - 120,000 SAR

Now create a detailed plan for:
Business Type: ${sanitizedData.businessType}
Location: ${sanitizedData.location}
Budget: ${sanitizedData.budget}
Services: ${sanitizedData.services.join(', ')}
Timeline: ${sanitizedData.timeline}
Experience Level: ${sanitizedData.experience}
Space Size: ${sanitizedData.spaceSize}
Equipment Preference: ${sanitizedData.equipmentPreference}

Provide a comprehensive business plan with all sections. Include specific cost breakdowns, equipment lists with prices, revenue projections, and implementation steps.`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    // Generate workshop layout image using DALL-E with enhanced prompts
    const createImagePrompt = () => {
      const services = sanitizedData.services || [];
      const spaceSize = sanitizedData.spaceSize || '';
      const businessType = sanitizedData.businessType || '';
      const equipment = sanitizedData.equipmentPreference || '';
      
      // Customize prompt based on services
      let serviceDetails = '';
      if (services.includes('صيانة دورية')) serviceDetails += 'regular maintenance bays, oil change stations, ';
      if (services.includes('إصلاح المحركات')) serviceDetails += 'engine repair areas, diagnostic equipment, ';
      if (services.includes('خدمات الكهرباء')) serviceDetails += 'electrical service stations, wiring diagrams, ';
      if (services.includes('إصلاح الهيكل والدهان')) serviceDetails += 'body shop area, paint booth, welding station, ';
      if (services.includes('فحص شامل')) serviceDetails += 'comprehensive inspection bay, testing equipment, ';
      
      return `Professional automotive workshop architectural layout design for ${businessType} in ${sanitizedData.location}. Modern, clean, organized space of ${spaceSize} with ${serviceDetails}service areas. Include detailed equipment placement, customer waiting area with comfortable seating, office space, storage areas, and workflow optimization. Architectural blueprint style with clear annotations, dimensions, and professional layout. Show work bays, hydraulic lifts, diagnostic equipment, tool storage cabinets, safety zones, and proper ventilation. High-quality, detailed, professional design suitable for business planning. Use ${equipment} equipment standards. Include parking area, entrance, and exit flow.`;
    };

    const imageCompletion = await openai.images.generate({
      model: "dall-e-3",
      prompt: createImagePrompt(),
      n: 1,
      size: "1024x1024",
      quality: "hd"
    });

    const plan = planCompletion.choices[0]?.message?.content;
    const imageUrl = imageCompletion.data?.[0]?.url;

    if (!plan || !imageUrl) {
      throw new Error('Failed to generate plan or image');
    }

    return NextResponse.json({
      success: true,
      plan: plan,
      imageUrl: imageUrl,
      metadata: {
        businessType: sanitizedData.businessType,
        location: sanitizedData.location,
        budget: sanitizedData.budget,
        services: sanitizedData.services,
        timestamp: new Date().toISOString(),
        rateLimitRemaining: rateLimiter.getRemainingRequests(clientIP, 5)
      }
    });

  } catch (error) {
    console.error('Error generating workshop plan:', error);
    
    if (error instanceof Error && error.message.includes('rate limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate workshop plan. Please try again.',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}