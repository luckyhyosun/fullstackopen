import patientsData from '../data/patients';
import { Patient, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = ():PatientEntry[] => {
  return patientsData.map(({id, name, dateOfBirth, ssn, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  }));
};

const addPatient = (object: PatientEntry): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...object
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
