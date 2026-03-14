import axios from 'axios';
import { Diary, DiaryWithoutID } from '../types';

const baseURL = '/api/diaries';

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(baseURL);
  return data
}

const createDiary = async (object: DiaryWithoutID) => {
  const { data } = await axios.post<Diary>(baseURL, object);

  return data;
}

export default { getAllDiaries, createDiary }
