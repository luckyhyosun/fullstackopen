import { PatientEntry, Gender } from './types';
import { z } from 'zod';

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
        name: z.string().parse(object.name),
        dateOfBirth: z.string().parse(object.dateOfBirth),
        ssn: z.string().parse(object.ssn),
        gender: z.nativeEnum(Gender).parse(object.gender),
        occupation: z.string().parse(object.occupation)
      };
      return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
