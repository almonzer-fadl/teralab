import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const workshopData: WorkshopData = req.body;

    // Generate comprehensive workshop plan using GPT-4
    const planCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert automotive workshop consultant for TeraLab. Create comprehensive, professional workshop business plans in both Arabic and English. Include detailed cost breakdowns, ROI calculations, equipment lists, and implementation timelines based on GCC market conditions.`
        },
        {
          role: "user",
          content: `Create a detailed workshop plan with the following specifications:
          
          Business Type: ${workshopData.businessType}
          Location: ${workshopData.location}
          Budget: ${workshopData.budget}
          Services: ${workshopData.services.join(', ')}
          Timeline: ${workshopData.timeline}
          Experience Level: ${workshopData.experience}
          Space Size: ${workshopData.spaceSize}
          Equipment Preference: ${workshopData.equipmentPreference}
          
          Please provide:
          1. Executive Summary (Arabic & English)
          2. Detailed cost breakdown
          3. Equipment specifications and costs
          4. Revenue projections
          5. Implementation timeline
          6. Risk analysis
          7. Marketing strategy
          8. Staffing requirements
          9. Operational procedures
          10. Success metrics
          
          Format as a professional business plan with clear sections.`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    // Generate workshop layout image using DALL-E
    const imageCompletion = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Professional automotive workshop layout design for ${workshopData.businessType} in ${workshopData.location}. Modern, clean, organized space of ${workshopData.spaceSize} with ${workshopData.services.join(', ')} service areas. Include equipment placement, customer waiting area, and workflow optimization. Architectural blueprint style with annotations.`,
      n: 1,
      size: "1024x1024",
      quality: "hd"
    });

    const plan = planCompletion.choices[0]?.message?.content;
    const imageUrl = imageCompletion.data?.[0]?.url;

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: 'Error generating workshop plan',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
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