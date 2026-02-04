import { PatientEntry } from './types';

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
        name: "KIM",
        dateOfBirth: "2000-01-01",
        ssn: "Cute",
        gender: "female",
        occupation: "Developer"
      };
      return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
