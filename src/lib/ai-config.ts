export const AI_CONFIG = {
    // OpenAI Configuration
    openai: {
      model: 'gpt-4',
      maxTokens: 4000,
      temperature: 0.7,
      systemPrompt: `You are an expert automotive workshop consultant for TeraLab, a premium consulting company in the GCC region. 
  
  Your expertise includes:
  - Automotive workshop design and layout optimization
  - Business planning and financial modeling
  - Equipment selection and procurement
  - Staff training and operational procedures
  - Marketing and customer acquisition strategies
  - Compliance with GCC automotive industry regulations
  
  Always provide:
  - Detailed, actionable advice
  - Accurate cost estimates in SAR (Saudi Riyals)
  - Cultural considerations for the GCC market
  - Both Arabic and English explanations when relevant
  - Realistic timelines and implementation steps
  
  Be professional, knowledgeable, and focused on practical solutions that generate profitable automotive workshops.`
    },
  
    // DALL-E Configuration
    dalle: {
      model: 'dall-e-3',
      size: '1024x1024' as const,
      quality: 'hd' as const,
      style: 'natural' as const
    },
  
    // Rate Limiting
    rateLimits: {
      planGeneration: 5, // per hour per IP
      pdfGeneration: 10, // per hour per IP
      imageGeneration: 3 // per hour per IP
    },
  
    // Pricing (in SAR)
    pricing: {
      'workshop-plan': 299,
      'consultation': 99,
      'full-implementation': 2999,
      'equipment-package': 1999,
      'training-package': 999
    }
  };

  
  
  
 
  
  
  