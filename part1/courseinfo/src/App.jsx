const Header = (props) => {
  return <h1>{props.course}</h1>
}
const Part = (props)=> {
  return <p>{props.part} {props.exercises}</p>
}
const Content = (props) => {
  return (
    <div>
      {/* <p>{props.part1} {props.exercises1}</p>
      <p>{props.part2} {props.exercises2}</p>
      <p>{props.part3} {props.exercises3}</p> */}
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
      <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
      <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
    </div>
  )
}
const Total = (props) => {
  const num = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return <p>📝The number of exercises {num}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <h2>👉Remember: "The only way to go fast, is to go well"👈</h2>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
