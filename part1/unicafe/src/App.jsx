import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick = {onClick}>{text}</button>
}

const Statistics = ({good, neutral, bad}) => {
  if(!good && !neutral && !bad){
    return <p>No Feedback Given</p>
  }else{
    const total = good + neutral + bad;
    const average = ((good * 1) + (neutral * 0) + (bad * -1))/total;
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="Total" value={total}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Percentage" value={good/total*100 + "%"}/>
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => {setGood(good + 1)}} text="Good 👍"/>
      <Button onClick={() => {setNeutral(neutral + 1)}} text="Neutral 🤔"/>
      <Button onClick={() => {setBad(bad + 1)}} text="Bad 👎"/>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

      <h3 style={{marginTop: '100px'}}>Lesson from this practice!</h3>
      <p>In React, a component must return <span style={{ color: 'red' }}>exactly one top-level element</span>. That element can be:</p>
      <ul>
        <li>A div, section, and table tags etc.</li>
        <li>A React fragment: &lt;&gt;...&lt;/&gt;</li>
        <li>A custom component</li>
      </ul>

      <h3>Why is okay not to use a wrapping div tag?</h3>
      <p>01. Statistics Component is fine returning just <code>&lt;table&gt;</code>, because that is a single top-level element.</p>
      <p>02. StatisticLine Component must return <code>&lt;tr&gt;</code> because it is inside a <code>&lt;tbody&gt;</code> and HTML requires that.</p>
    </div>
  )
}

export default App
