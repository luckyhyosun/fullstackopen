import { useEffect, useState } from "react";
import { Diary } from './types';
import diaryService from './services/diary';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();

      setDiaries(diaries);
    }
    void fetchDiaries();
  }, []);

  console.log(diaries);


  return (
    <>
      <p>hello</p>
    </>
  )
}

export default App
