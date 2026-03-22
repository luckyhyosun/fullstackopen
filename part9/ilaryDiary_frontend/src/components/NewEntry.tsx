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

  const onchangeVisibility = (e) => {
    setVisibility(e.target.value);
  }

  const onChangeWeather = (e) => {
    setWeather(e.target.value);
  }

  return (
    <>
      <form onSubmit={addDiary}>
        date: <input
        type="date"
        value={date}
        onChange={({target}) => setDate(target.value)}
        ></input><br />

        visibility:
        <input type="radio" id="great" value="great" name="visibility" onChange={onchangeVisibility} />
        <label htmlFor="great">great</label>
        <input type="radio" id="good" value="good" name="visibility" onChange={onchangeVisibility} />
        <label htmlFor="good">good</label>
        <input type="radio" id="ok" value="ok" name="visibility" onChange={onchangeVisibility} />
        <label htmlFor="ok">ok</label>
        <input type="radio" id="poor" value="poor" name="visibility" onChange={onchangeVisibility} />
        <label htmlFor="poor">poor</label><br />

        weather:
        <input type="radio" id="sunny" value="sunny" name="weather" onChange={onChangeWeather} />
        <label htmlFor="great">sunny</label>
        <input type="radio" id="rainy" value="rainy" name="weather" onChange={onChangeWeather} />
        <label htmlFor="good">rainy</label>
        <input type="radio" id="cloudy" value="cloudy" name="weather" onChange={onChangeWeather} />
        <label htmlFor="ok">cloudy</label>
        <input type="radio" id="stormy" value="stormy" name="weather" onChange={onChangeWeather} />
        <label htmlFor="poor">stormy</label>
        <input type="radio" id="windy" value="windy" name="weather" onChange={onChangeWeather} />
        <label htmlFor="poor">windy</label><br />

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
