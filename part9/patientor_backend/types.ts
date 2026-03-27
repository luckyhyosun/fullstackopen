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

export interface Entry {

}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export type PatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = z.infer<typeof newPatientSchema>;
