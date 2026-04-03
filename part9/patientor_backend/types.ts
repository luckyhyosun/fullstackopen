import { z } from 'zod';
import { newPatientSchema } from './utils';

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: BaseEntry[];
}

export type PatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = z.infer<typeof newPatientSchema>;
