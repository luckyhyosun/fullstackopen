import { Diary } from '../types';

interface Props {
  data: Diary
}

const DiaryLog = ({data}: Props) => {
  return(
    <div>
      <strong>{data.date}</strong>
      <p><strong>visibility: </strong> {data.visibility} <br />
      <strong>weather</strong>: {data.weather}</p>
    </div>
  );
};

export default DiaryLog;
