const Filter = (props) => {
  return (
    <div>
      <h3>Find Animals</h3>
      <input onChange={props.clickEventHandler} />
      <ul>
        {props.filteredAnimal.map((animal) => {
          // console.log(animal);
          return <li key={animal.id}>{animal.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Filter;
