import axios from 'axios';
import { Diary } from '../types';

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>('/api/diaries');
  return data
}

export default { getAllDiaries }
