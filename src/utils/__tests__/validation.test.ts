
import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeHTML, eventValidationSchema, rateLimiter } from '../validation';

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags from input', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });

  describe('sanitizeHTML', () => {
    it('should allow safe HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const result = sanitizeHTML(html);
      expect(result).toContain('<p>');
      expect(result).toContain('<strong>');
    });

    it('should remove dangerous tags', () => {
      const html = '<script>alert("xss")</script><p>Safe content</p>';
      const result = sanitizeHTML(html);
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>');
    });
  });

  describe('eventValidationSchema', () => {
    it('should validate correct event data', () => {
      const validEvent = {
        title: 'Test Event',
        description: 'This is a test event description',
        location: 'Test Location',
        date_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        max_attendees: 50,
      };

      const result = eventValidationSchema.safeParse(validEvent);
      expect(result.success).toBe(true);
    });

    it('should reject events with past dates', () => {
      const invalidEvent = {
        title: 'Test Event',
        description: 'This is a test event description',
        location: 'Test Location',
        date_time: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      };

      const result = eventValidationSchema.safeParse(invalidEvent);
      expect(result.success).toBe(false);
    });
  });

  describe('rateLimiter', () => {
    it('should allow requests within limit', () => {
      const key = 'test-key-1';
      expect(rateLimiter.isAllowed(key, 5, 60000)).toBe(true);
      expect(rateLimiter.isAllowed(key, 5, 60000)).toBe(true);
    });

    it('should block requests when limit exceeded', () => {
      const key = 'test-key-2';
      // Make 5 requests (should all be allowed)
      for (let i = 0; i < 5; i++) {
        expect(rateLimiter.isAllowed(key, 5, 60000)).toBe(true);
      }
      // 6th request should be blocked
      expect(rateLimiter.isAllowed(key, 5, 60000)).toBe(false);
    });
  });
});
