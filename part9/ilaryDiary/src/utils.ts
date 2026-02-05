import { NewDiaryEntry, Visibility, Weather } from './types';
import { z } from 'zod';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      weather: z.nativeEnum(Weather).parse(object.weather),
      visibility: z.nativeEnum(Visibility).parse(object.visibility),
      date: z.string().date().parse(object.date),
      comment: z.string().parse(object.comment)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;
