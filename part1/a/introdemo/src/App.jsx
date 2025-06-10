const Greeting = (props) => {
  return <div>
      <p>{props.name} from {props.city}</p>
    </div>
}

const App = () => {
  console.log("I love React yayyyy");
  // const firstName = "hyosun";
  // const lastName = "kim";
  // const city = "Stockholm";
  const user01 = {
    name: "hyosun",
    city: "Stockholm"
  };
  const user02 = {
    name: "kim",
    city: "Seoul"
  }
  const status = ["student", "KTH", 1]

  return (
    //<div>
    <>
      <h2>Hur mår du?</h2>
      <Greeting name = {user01.name} city = {user01.city}/>
      <Greeting name = {user02.name} city = {user02.city}/>
      <p>She is a {status[2]}year {status[0]} of {status[1]}, </p>
    </>
    //</div>
  )
}

export default App
