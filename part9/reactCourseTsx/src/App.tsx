interface NameProps {
  name: string
}

interface CoursePart {
  name: string
  exerciseCount: number
}

interface ContentProps {
  parts: CoursePart[]
}

interface TotalProps {
  total: number
}

const Header = ({ name }: NameProps) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  )
}

const Total = ({ total }: TotalProps) => {
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types"
  },
];copy

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name = {courseName} />
      <Content parts = {courseParts} />
      <Total total = {totalExercises} />
    </div>
  );
};

export default App;
