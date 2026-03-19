import axios from "axios";
import { useEffect, useState } from "react";
import { Diary, DiaryWithoutID } from './types';
import diaryService from './services/diary';
import DiaryComponent from './components/Diary';
import NewEntry from './components/NewEntry';
import ErrorMessage from './components/Error';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();

      setDiaries(diaries);
    }
    void fetchDiaries();
  }, []);

  const submitNewDiary = async (values: DiaryWithoutID) => {
    try {
      const newDiary = await diaryService.createDiary(values);
      console.log(newDiary);

      setDiaries(diaries.concat(newDiary))
    }catch(e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return (
    <>
      <h2>Add a new Entry</h2>
      <ErrorMessage error={error}/>
      <NewEntry onSubmit={submitNewDiary}/>
      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <DiaryComponent key={diary.id} data={diary} />
      ))}
    </>
  )
}

export default App
