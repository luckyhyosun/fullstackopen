import patientsData from '../data/patients';
import { PatientEntry, Entry, EntryForm } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const addPatient = (object: PatientEntry): PatientEntry => {
  const newPatient = {
    ...object,
  };

  patientsData.push(newPatient);
  return newPatient;
};


const addEntry = (patientId: string, entry: EntryForm): Entry => {
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};
