import { NewDiaryEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const toNewDiaryEntry = (object: unknown):NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    weather: 'cloudy', // fake the return value
    visibility: 'great',
    date: '2022-1-1',
    comment: parseComment(object.comment)
  };

  return newEntry;
};

export default toNewDiaryEntry;
