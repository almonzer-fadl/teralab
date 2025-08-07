// AI Feedback and Learning System

export interface FeedbackData {
  sessionId: string;
  workshopData: any;
  generatedPlan: string;
  userRating: number; // 1-5 stars
  userFeedback: string;
  planUsed: boolean;
  consultationBooked: boolean;
  paymentMade: boolean;
  timestamp: Date;
}

export interface LearningMetrics {
  totalSessions: number;
  averageRating: number;
  conversionRate: number;
  popularServices: string[];
  successfulPatterns: any[];
}

class AILearningSystem {
  private feedbackData: FeedbackData[] = [];
  private learningMetrics: LearningMetrics = {
    totalSessions: 0,
    averageRating: 0,
    conversionRate: 0,
    popularServices: [],
    successfulPatterns: []
  };

  // Collect feedback from user interactions
  async collectFeedback(feedback: FeedbackData) {
    this.feedbackData.push(feedback);
    await this.updateMetrics();
    await this.identifyPatterns();
  }

  // Update learning metrics
  private async updateMetrics() {
    const total = this.feedbackData.length;
    const ratings = this.feedbackData.map(f => f.userRating);
    const conversions = this.feedbackData.filter(f => f.paymentMade || f.consultationBooked);
    
    this.learningMetrics = {
      totalSessions: total,
      averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
      conversionRate: (conversions.length / total) * 100,
      popularServices: this.getPopularServices(),
      successfulPatterns: this.getSuccessfulPatterns()
    };
  }

  // Identify successful patterns
  private async identifyPatterns() {
    const successfulSessions = this.feedbackData.filter(f => f.userRating >= 4);
    
    const patterns = successfulSessions.map(session => ({
      workshopType: session.workshopData.businessType,
      location: session.workshopData.location,
      services: session.workshopData.services,
      budget: session.workshopData.budget,
      equipment: session.workshopData.equipmentPreference,
      rating: session.userRating
    }));

    this.learningMetrics.successfulPatterns = patterns;
  }

  // Get popular services
  private getPopularServices(): string[] {
    const allServices = this.feedbackData.flatMap(f => f.workshopData.services);
    const serviceCounts = allServices.reduce((acc, service) => {
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(serviceCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([service]) => service);
  }

  // Get successful patterns
  private getSuccessfulPatterns() {
    return this.feedbackData
      .filter(f => f.userRating >= 4)
      .map(f => f.workshopData);
  }

  // Generate improved prompts based on learning
  generateImprovedPrompt(workshopData: any): string {
    const similarSuccessfulCases = this.findSimilarCases(workshopData);
    
    let improvedPrompt = `Based on ${this.learningMetrics.totalSessions} successful cases, here's what works best:\n\n`;
    
    if (similarSuccessfulCases.length > 0) {
      improvedPrompt += `Similar successful workshops achieved:\n`;
      similarSuccessfulCases.forEach((case_, index) => {
        improvedPrompt += `${index + 1}. ${case_.businessType} in ${case_.location} - ROI: ${case_.expectedROI}\n`;
      });
    }

    improvedPrompt += `\nPopular services: ${this.learningMetrics.popularServices.join(', ')}\n`;
    improvedPrompt += `Average conversion rate: ${this.learningMetrics.conversionRate.toFixed(1)}%\n\n`;
    
    return improvedPrompt;
  }

  // Find similar cases
  private findSimilarCases(workshopData: any) {
    return this.learningMetrics.successfulPatterns.filter(pattern => 
      pattern.businessType === workshopData.businessType ||
      pattern.location === workshopData.location ||
      pattern.services.some((s: string) => workshopData.services.includes(s))
    );
  }

  // Get analytics
  getAnalytics() {
    return {
      metrics: this.learningMetrics,
      recentFeedback: this.feedbackData.slice(-10),
      topPerformingPatterns: this.learningMetrics.successfulPatterns.slice(0, 5)
    };
  }
}

export const aiLearningSystem = new AILearningSystem();

// Image generation learning
export class ImageLearningSystem {
  private imageFeedback: any[] = [];

  async collectImageFeedback(imageUrl: string, workshopData: any, userRating: number) {
    this.imageFeedback.push({
      imageUrl,
      workshopData,
      userRating,
      timestamp: new Date()
    });
  }

  generateImprovedImagePrompt(workshopData: any): string {
    const successfulImages = this.imageFeedback.filter(f => f.userRating >= 4);
    const similarCases = successfulImages.filter(f => 
      f.workshopData.businessType === workshopData.businessType ||
      f.workshopData.services.some((s: string) => workshopData.services.includes(s))
    );

    let improvedPrompt = `Based on ${successfulImages.length} highly-rated workshop layouts:\n\n`;
    
    if (similarCases.length > 0) {
      improvedPrompt += `Successful layouts for similar workshops include:\n`;
      similarCases.forEach((case_, index) => {
        improvedPrompt += `${index + 1}. ${case_.workshopData.businessType} with ${case_.workshopData.services.join(', ')}\n`;
      });
    }

    return improvedPrompt;
  }
}

export const imageLearningSystem = new ImageLearningSystem();
