import { PatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error ('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatientEntry = (object: unknown):PatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }

  if(
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender'in object &&
    'occupation' in object){
      const newPatientEntry: PatientEntry = {
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: parseOccupation(object.occupation)
      };
      return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
