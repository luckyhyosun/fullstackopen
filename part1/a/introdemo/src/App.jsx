const App = () => {
  console.log("I love React yayyyy");
  const now = new Date();
  const firstName = "hyosun";
  const lastName = "kim";
  console.log(now, firstName+" "+lastName)

  return (
    <div>
      <h1>My name is ... {firstName} {lastName}</h1>
      <p>Hello React world, it is {now.toString()}</p>
    </div>
  )
}

export default App
