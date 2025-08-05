export interface WorkshopRequirements {
    businessType: string;
    location: string;
    budget: string;
    services: string[];
    timeline: string;
    experience: string;
    spaceSize: string;
    equipmentPreference: string;
  }
  
  export const WORKSHOP_TEMPLATES = {
    'general-repair': {
      minSpace: 200,
      basicEquipment: [
        'Vehicle Lift (2-post)',
        'Air Compressor',
        'Tool Cabinet',
        'Engine Diagnostic Scanner',
        'Wheel Balancer',
        'Tire Changer'
      ],
      estimatedCost: {
        min: 150000,
        max: 300000
      },
      monthlyRevenue: {
        min: 25000,
        max: 45000
      }
    },
    'specialized-workshop': {
      minSpace: 150,
      basicEquipment: [
        'Specialized Diagnostic Equipment',
        'Component Testing Tools',
        'Vehicle Lift',
        'Air Compressor',
        'Specialized Tool Sets'
      ],
      estimatedCost: {
        min: 200000,
        max: 400000
      },
      monthlyRevenue: {
        min: 30000,
        max: 55000
      }
    },
    'quick-service': {
      minSpace: 100,
      basicEquipment: [
        'Quick-Lube Pit',
        'Oil Dispensing System',
        'Tire Service Equipment',
        'Basic Hand Tools',
        'Waiting Area Furniture'
      ],
      estimatedCost: {
        min: 80000,
        max: 150000
      },
      monthlyRevenue: {
        min: 20000,
        max: 35000
      }
    },
    'premium-workshop': {
      minSpace: 300,
      basicEquipment: [
        'Premium Vehicle Lifts (4-post & 2-post)',
        'Advanced Diagnostic Systems',
        'Wheel Alignment Machine',
        'Paint Booth (if applicable)',
        'Customer Lounge Equipment',
        'Complete Tool Sets'
      ],
      estimatedCost: {
        min: 400000,
        max: 800000
      },
      monthlyRevenue: {
        min: 50000,
        max: 100000
      }
    }
  };