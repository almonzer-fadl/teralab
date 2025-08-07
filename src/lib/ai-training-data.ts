// AI Training Data for TeraLab Workshop Assistant

export const workshopExamples = {
  // Example workshop configurations
  examples: [
    {
      type: "ورشة إصلاح عامة",
      location: "السعودية - الرياض",
      budget: "100,000 - 300,000 ريال",
      services: ["صيانة دورية", "إصلاح المحركات"],
      spaceSize: "200 - 400 متر مربع",
      equipment: "معدات متطورة",
      expectedROI: "18-25%",
      setupTime: "3-4 months",
      monthlyRevenue: "45,000 - 75,000 SAR"
    },
    {
      type: "ورشة متخصصة",
      location: "الإمارات - دبي",
      budget: "300,000 - 500,000 ريال",
      services: ["خدمات الكهرباء", "إصلاح الهيكل والدهان"],
      spaceSize: "400 - 600 متر مربع",
      equipment: "أحدث التقنيات",
      expectedROI: "25-35%",
      setupTime: "4-6 months",
      monthlyRevenue: "80,000 - 120,000 SAR"
    }
  ],

  // Equipment specifications
  equipmentSpecs: {
    "معدات مستعملة موثوقة": {
      cost: "150,000 - 250,000 SAR",
      includes: ["Hydraulic lifts", "Basic diagnostic tools", "Hand tools"],
      lifespan: "5-8 years"
    },
    "معدات جديدة اقتصادية": {
      cost: "250,000 - 400,000 SAR",
      includes: ["Modern lifts", "Advanced diagnostics", "Safety equipment"],
      lifespan: "8-12 years"
    },
    "معدات متطورة": {
      cost: "400,000 - 600,000 SAR",
      includes: ["Premium lifts", "Computer diagnostics", "Automated systems"],
      lifespan: "12-15 years"
    },
    "أحدث التقنيات": {
      cost: "600,000+ SAR",
      includes: ["Smart lifts", "AI diagnostics", "IoT integration"],
      lifespan: "15+ years"
    }
  },

  // Market insights
  marketData: {
    "السعودية - الرياض": {
      marketSize: "Large",
      competition: "Medium",
      growthRate: "12% annually",
      avgRevenue: "65,000 SAR/month"
    },
    "السعودية - جدة": {
      marketSize: "Large",
      competition: "High",
      growthRate: "15% annually",
      avgRevenue: "75,000 SAR/month"
    },
    "الإمارات - دبي": {
      marketSize: "Very Large",
      competition: "Very High",
      growthRate: "18% annually",
      avgRevenue: "90,000 SAR/month"
    }
  }
};

// Enhanced prompts for better responses
export const enhancedPrompts = {
  systemPrompt: `You are TeraLab's expert automotive workshop consultant with 20+ years of experience in GCC markets. You have successfully helped 500+ workshops establish and grow their businesses.

Your expertise includes:
- GCC market dynamics and regulations
- Automotive industry trends
- Financial planning and ROI optimization
- Equipment selection and procurement
- Staff training and operational procedures
- Marketing strategies for automotive businesses

Always provide:
1. Specific, actionable advice
2. Realistic financial projections
3. Local market context
4. Both Arabic and English explanations
5. Step-by-step implementation plans
6. Risk mitigation strategies
7. Success metrics and KPIs`,

  imagePromptTemplate: `Create a professional automotive workshop layout for {businessType} in {location}. Space: {spaceSize}. Services: {services}. Equipment: {equipment}. 

Requirements:
- Architectural blueprint style
- Clear work zones and flow
- Safety compliance areas
- Customer waiting area
- Office and storage spaces
- Equipment placement
- Ventilation and lighting
- Parking and access points
- Professional annotations
- High-quality, detailed design`
};

// Response templates for consistency
export const responseTemplates = {
  executiveSummary: `# Executive Summary

## Workshop Overview
**Type:** {businessType}
**Location:** {location}
**Investment:** {budget}
**Expected ROI:** {roi}
**Setup Time:** {timeline}

## Key Highlights
- {keyPoint1}
- {keyPoint2}
- {keyPoint3}

## Financial Projections
- **Monthly Revenue:** {monthlyRevenue}
- **Break-even:** {breakEven}
- **Annual Profit:** {annualProfit}`,

  financialBreakdown: `# Financial Breakdown

## Initial Investment
- Equipment: {equipmentCost}
- Renovation: {renovationCost}
- Licensing: {licensingCost}
- Working Capital: {workingCapital}
**Total:** {totalInvestment}

## Monthly Operating Costs
- Rent: {rent}
- Utilities: {utilities}
- Staff: {staff}
- Maintenance: {maintenance}
**Total:** {monthlyCosts}

## Revenue Projections
- Service Revenue: {serviceRevenue}
- Parts Sales: {partsRevenue}
- Additional Services: {additionalRevenue}
**Total Monthly Revenue:** {totalRevenue}`
};
