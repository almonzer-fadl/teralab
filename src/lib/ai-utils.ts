import { WorkshopRequirements } from './workshop-data';
  
export class WorkshopAnalyzer {
  static calculateEstimatedCost(requirements: WorkshopRequirements): number {
    const baseMultipliers = {
      'general-repair': 1.0,
      'specialized-workshop': 1.3,
      'quick-service': 0.7,
      'premium-workshop': 2.0
    };

    const locationMultipliers = {
      'riyadh': 1.1,
      'jeddah': 1.05,
      'dubai': 1.2,
      'kuwait': 1.08,
      'other': 1.0
    };

    const spaceMultipliers = {
      'small': 0.8,   // < 200 sqm
      'medium': 1.0,  // 200-400 sqm
      'large': 1.3,   // 400-600 sqm
      'xlarge': 1.6   // > 600 sqm
    };

    let baseCost = 200000; // Base cost in SAR
    
    // Apply multipliers
    const businessKey = this.getBusinessTypeKey(requirements.businessType);
    const locationKey = this.getLocationKey(requirements.location);
    const spaceKey = this.getSpaceKey(requirements.spaceSize);

    baseCost *= baseMultipliers[businessKey as keyof typeof baseMultipliers] || 1.0;
    baseCost *= locationMultipliers[locationKey as keyof typeof locationMultipliers] || 1.0;
    baseCost *= spaceMultipliers[spaceKey as keyof typeof spaceMultipliers] || 1.0;

    return Math.round(baseCost);
  }

  static calculateMonthlyRevenue(requirements: WorkshopRequirements): number {
    const estimatedCost = this.calculateEstimatedCost(requirements);
    const revenueMultiplier = 0.15; // 15% of setup cost as monthly revenue
    return Math.round(estimatedCost * revenueMultiplier);
  }

  static calculatePaybackPeriod(requirements: WorkshopRequirements): number {
    const estimatedCost = this.calculateEstimatedCost(requirements);
    const monthlyRevenue = this.calculateMonthlyRevenue(requirements);
    const monthlyProfit = monthlyRevenue * 0.3; // 30% profit margin
    
    return Math.round(estimatedCost / monthlyProfit);
  }

  private static getBusinessTypeKey(businessType: string): string {
    if (businessType.includes('عامة') || businessType.includes('General')) return 'general-repair';
    if (businessType.includes('متخصصة') || businessType.includes('Specialized')) return 'specialized-workshop';
    if (businessType.includes('سريعة') || businessType.includes('Quick')) return 'quick-service';
    if (businessType.includes('فاخرة') || businessType.includes('Premium')) return 'premium-workshop';
    return 'general-repair';
  }

  private static getLocationKey(location: string): string {
    if (location.includes('الرياض') || location.includes('Riyadh')) return 'riyadh';
    if (location.includes('جدة') || location.includes('Jeddah')) return 'jeddah';
    if (location.includes('دبي') || location.includes('Dubai')) return 'dubai';
    if (location.includes('الكويت') || location.includes('Kuwait')) return 'kuwait';
    return 'other';
  }

  private static getSpaceKey(spaceSize: string): string {
    if (spaceSize.includes('200')) return 'small';
    if (spaceSize.includes('200 - 400')) return 'medium';
    if (spaceSize.includes('400 - 600')) return 'large';
    if (spaceSize.includes('600')) return 'xlarge';
    return 'medium';
  }
}