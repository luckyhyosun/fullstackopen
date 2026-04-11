import { Gender, Diagnosis } from './types';
import { z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any())
});

export const newEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  healthCheckRating: z.number().int().min(0).max(3),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
