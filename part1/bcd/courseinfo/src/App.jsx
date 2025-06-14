import { useState } from 'react';

const History = (props) => {
  // console.log(props);

  if(props.clicks.length === 0){
    return <p><i>Plz click the L/R buttons.</i></p>
  }else{
    return <p>History of clicks: {props.clicks.join("+")}</p>
  }
}

const Button = ({onClick, name}) => {
  return <button onClick={onClick}>{name}</button>
}

const App = () => {
  const [left, setLeftClick] = useState(0);
  const [right, setRightClick] = useState(0);
  const [all, setAllClick] = useState([]);
  const [total, setTotalClick] = useState(0);

  const handleLeftClick = () => {
    setAllClick(all.concat("L"));
    const updatedLeft = left + 1;
    setLeftClick(updatedLeft);
    setTotalClick(updatedLeft + right);
  }

  const handleRightClick = () => {
    setAllClick(all.concat("R"));
    const updatedRight = right + 1;
    setRightClick(updatedRight);
    setTotalClick(left + updatedRight);
  }

  return (
    <div>
    {left}
    <Button onClick = {handleLeftClick} name = "Left"/>

    <Button onClick = {handleRightClick} name = "Right" />
    {right}
    <History clicks = {all}/>
    <p>Total click counts: {total}</p>
    </div>
  )
}

export default App
