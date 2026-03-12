import { useEffect, useState } from "react";
import { Diary } from './types';
import diaryService from './services/diary';
import DiaryComponent from './components/Diary';
import NewEntry from './components/NewEntry';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();

      setDiaries(diaries);
    }
    void fetchDiaries();
  }, []);

  const submitNewDiary = (values) => {
    console.log("add new a diary");
    console.log(values);
  }

  return (
    <>
      <h2>Add a new Entry</h2>
      <NewEntry onSubmit={submitNewDiary}/>
      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <DiaryComponent key={diary.id} data={diary} />
      ))}
    </>
  )
}

export default App
