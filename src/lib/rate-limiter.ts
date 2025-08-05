interface RateLimitEntry {
    count: number;
    resetTime: number;
  }
  
  class RateLimiter {
    private limits: Map<string, RateLimitEntry> = new Map();
    
    isAllowed(key: string, maxRequests: number, windowMs: number = 3600000): boolean {
      const now = Date.now();
      const entry = this.limits.get(key);
      
      if (!entry || now > entry.resetTime) {
        this.limits.set(key, {
          count: 1,
          resetTime: now + windowMs
        });
        return true;
      }
      
      if (entry.count >= maxRequests) {
        return false;
      }
      
      entry.count++;
      return true;
    }
    
    getRemainingRequests(key: string, maxRequests: number): number {
      const entry = this.limits.get(key);
      if (!entry || Date.now() > entry.resetTime) {
        return maxRequests;
      }
      return Math.max(0, maxRequests - entry.count);
    }
  }
  
  export const rateLimiter = new RateLimiter();
  