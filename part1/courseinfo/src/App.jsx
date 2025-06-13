import { useState } from 'react'
//destructuring
const Display = ({counter}) => <p>{counter}</p>

//destructuring
const Button = ({onClick, name}) =>  <div><button onClick={onClick}>{name}</button></div>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  function increase (){setCounter(counter + 1)};
  function decrease (){setCounter(counter - 1)};
  function zero (){setCounter(0)}

  return (
    <div>
      <Button onClick={increase} name = "increase" />
      <Display counter = {counter} />

      <Button onClick={decrease} name = "decrease" />
      <Button onClick={zero} name = "zero" />
    </div>
  )
}

export default App
