import { z } from 'zod';

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracy: z.number().nullable().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const createSosSchema = z.object({
  message: z.string().trim().max(240).optional(),
  location: locationSchema.optional(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'UNKNOWN']).optional(),
  riskScore: z.number().min(0).max(100).optional(),
});

export const resolveEmergencySchema = z.object({
  status: z.enum(['RESOLVED', 'CANCELLED']).default('RESOLVED'),
});
