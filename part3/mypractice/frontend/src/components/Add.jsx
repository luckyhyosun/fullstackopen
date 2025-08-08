const Add = (props) => {
    return (
        <div>
            <form onSubmit={props.clickSubmitHandler}>
                <input
                onChange={props.clickEventHandler}
                value={props.newAnimal} />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default Add
