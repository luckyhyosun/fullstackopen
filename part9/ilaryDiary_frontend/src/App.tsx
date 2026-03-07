import { useEffect, useState } from "react";
import { Diary } from './types';
import diaryService from './services/diary';
import DiaryComponent from './components/diary';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();

      setDiaries(diaries);
    }
    void fetchDiaries();
  }, []);

  return (
    <>
      <h1>ilary diary</h1>
      {diaries.map(diary => (
        <DiaryComponent key={diary.id} data={diary}/>
      ))}
    </>
  )
}

export default App
