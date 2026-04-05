import { z } from 'zod';
import { newPatientSchema } from './utils';

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export enum OccupationalHealthcare {
  "speicalist" = "MD House",
  "employerNmae" = "HyPD"
}

export enum Hospital {
  "speicalist" = "MD House"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
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

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
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

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = z.infer<typeof newPatientSchema>;
