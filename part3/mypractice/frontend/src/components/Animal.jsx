const Animal = (props) => {
    const label = props.animal.endangered ? "Mark not endangered" : "Mark endangered"

    return (
        <div>
            <li>
                <button onClick={props.clickDeleteHandler}>X</button>
                {props.animal.name}
                <button onClick={props.toggleImportance}>{label}</button>
            </li>
      </div>
    )
}

export default Animal
