import { NewDiaryEntry, Weather } from './types';

const isWeather = (str: string): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate  = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

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
    weather: parseWeather(object.weather), // fake the return value
    visibility: 'great',
    date: parseDate(object.date),
    comment: parseComment(object.comment)
  };

  return newEntry;
};

export default toNewDiaryEntry;
