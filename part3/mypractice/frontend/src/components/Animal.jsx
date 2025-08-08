const Animal = (props) => {
    return (
        <div>
            <button onClick={props.clickEventHandler}>
                I wanna see {props.showAll ? "Endangered" : "All"} Animals
            </button>

            <ul>
                {props.allAnimals.map(animal => <li key={animal.id}>{animal.name}</li>)}
            </ul>
      </div>
    )
}

export default Animal
