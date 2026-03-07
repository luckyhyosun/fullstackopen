import { Diary } from '../types';

interface Props {
  data: Diary
}

const DiaryLog = ({data}: Props) => {
  return(
    <div>
      date: {data.date}
      weather: {data.weather}
    </div>
  );
};

export default DiaryLog;
