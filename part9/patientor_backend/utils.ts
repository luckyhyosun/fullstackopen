import { PatientEntry, Gender } from './types';
import { z } from 'zod';

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const toNewPatientEntry = (object: unknown):PatientEntry => {
  return newPatientSchema.parse(object);
};

export default newPatientSchema;
