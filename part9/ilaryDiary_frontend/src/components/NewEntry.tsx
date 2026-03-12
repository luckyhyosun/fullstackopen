import { useState } from 'react';
import { DiaryWithoutID, Weather, Visibility } from '../types';

interface Props {
  onSubmit: (values: DiaryWithoutID) => void;
}

const NewEntry = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addDiary = (event:React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    })
  }

  return (
    <>
      <form onSubmit={addDiary}>
        date: <input
        type="text"
        value={date}
        onChange={({target}) => setDate(target.value)}
        ></input><br />

        visibility: <input
        type="text"
        value={visibility}
        onChange={({target}) => setVisibility(target.value)}
        ></input><br />

        weather: <input
        type="text"
        value={weather}
        onChange={({target}) => setWeather(target.value)}
        ></input><br />

        comment: <input
        type="text"
        value={comment}
        onChange={({target}) => setComment(target.value)}
        ></input><br />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default NewEntry;
