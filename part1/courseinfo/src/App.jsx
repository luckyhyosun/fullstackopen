import { useState } from 'react';

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [currentVal, setValue] = useState(0);

  return (
    <div>
      <h1>{currentVal}</h1>
      <Button onClick = {() => {setValue(1000)}} text = "Thousand"/>

      <Button onClick = {() => {setValue(0)}} text = "Reset" />

      <Button onClick = {() => {setValue(currentVal + 1)}} text = "increment" />
    </div>
  )
}

export default App
