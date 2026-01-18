import diaries from '../data/entries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = ():DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = ():NonSensitiveDiaryEntry[] => {
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
