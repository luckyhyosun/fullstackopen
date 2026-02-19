interface NameProps {
  name: string
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

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
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  parts.forEach(part => {
    switch(part.kind){
      case "basic":
        console.log('see the following:', part.description);
        break;
      case "group":
        console.log('see the following:', part.groupProjectCount);
        break;
      case "background":
        console.log('see the following:', part.backgroundMaterial);
        break;
      case "special":
        console.log('see the following:', part.requirements);
        break;
      default:
      assertNever(part);
    }
  })

  return (
    <div>
      {parts.map((part) => (
        <Part part = {part} />
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

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  if(part.kind === 'group'){
    return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
  }else{
    return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      );
  }
}

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
  ];

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
