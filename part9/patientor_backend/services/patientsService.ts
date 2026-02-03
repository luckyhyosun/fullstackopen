import patientsData from '../data/patients';
import { PatientEntry } from '../types';

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

export default {
  getPatients
};
