import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { workshopExamples, enhancedPrompts } from '../../../lib/ai-training-data';

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

export async function POST(request: NextRequest) {
  try {
    const workshopData: WorkshopData = await request.json();

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
Business Type: ${workshopData.businessType}
Location: ${workshopData.location}
Budget: ${workshopData.budget}
Services: ${workshopData.services.join(', ')}
Timeline: ${workshopData.timeline}
Experience Level: ${workshopData.experience}
Space Size: ${workshopData.spaceSize}
Equipment Preference: ${workshopData.equipmentPreference}

Provide a comprehensive business plan with all sections. Include specific cost breakdowns, equipment lists with prices, revenue projections, and implementation steps.`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    // Generate workshop layout image using DALL-E with enhanced prompts
    const createImagePrompt = () => {
      const services = workshopData.services || [];
      const spaceSize = workshopData.spaceSize || '';
      const businessType = workshopData.businessType || '';
      const equipment = workshopData.equipmentPreference || '';
      
      // Customize prompt based on services
      let serviceDetails = '';
      if (services.includes('صيانة دورية')) serviceDetails += 'regular maintenance bays, oil change stations, ';
      if (services.includes('إصلاح المحركات')) serviceDetails += 'engine repair areas, diagnostic equipment, ';
      if (services.includes('خدمات الكهرباء')) serviceDetails += 'electrical service stations, wiring diagrams, ';
      if (services.includes('إصلاح الهيكل والدهان')) serviceDetails += 'body shop area, paint booth, welding station, ';
      if (services.includes('فحص شامل')) serviceDetails += 'comprehensive inspection bay, testing equipment, ';
      
      return `Professional automotive workshop architectural layout design for ${businessType} in ${workshopData.location}. Modern, clean, organized space of ${spaceSize} with ${serviceDetails}service areas. Include detailed equipment placement, customer waiting area with comfortable seating, office space, storage areas, and workflow optimization. Architectural blueprint style with clear annotations, dimensions, and professional layout. Show work bays, hydraulic lifts, diagnostic equipment, tool storage cabinets, safety zones, and proper ventilation. High-quality, detailed, professional design suitable for business planning. Use ${equipment} equipment standards. Include parking area, entrance, and exit flow.`;
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

    return NextResponse.json({
      success: true,
      plan: plan,
      imageUrl: imageUrl,
      metadata: {
        generatedAt: new Date().toISOString(),
        workshopData: workshopData
      }
    });

  } catch (error) {
    console.error('AI Plan Generation Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error generating workshop plan',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    }, { status: 500 });
  }
}

// Rate limiting middleware
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}