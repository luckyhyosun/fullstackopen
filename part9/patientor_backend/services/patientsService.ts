import patientsData from '../data/patients';
import { PatientEntry } from '../types';

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

export default {
  getPatients,
  getPatientById,
  addPatient
};
