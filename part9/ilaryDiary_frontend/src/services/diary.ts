import axios from 'axios';
import { Diary, DiaryWithoutID } from '../types';

const baseURL = '/api/diaries';

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(baseURL);
  return data
}

const createDiary = async (object: DiaryWithoutID) => {
  try {
    const { data } = await axios.post<Diary>(baseURL, object);
    return data;
  } catch (error) {
    console.error('POST error:', error.response?.data);  // Add this
    throw error;
  }
};

export default { getAllDiaries, createDiary }
