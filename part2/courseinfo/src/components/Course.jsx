const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Header = (props) => <h2>{props.title}</h2>

const Content = (props) => (
  props.parts.map(part => {
    return <Part key={part.id} part={part} />
  })
)

const Total = ({parts}) => {
  const totalExercises = parts.reduce((total, part) => {
    // console.log(total, part.exercises);
    return total + part.exercises
  },0)
  // console.log(totalExercises);

  return <p><b>Total of {totalExercises} exercises.</b></p>
}

const Course = (props) => {
    return (
        <div>
            <Header title={props.course.name}/>
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts}/>
        </div>
    )
}

export default Course;
