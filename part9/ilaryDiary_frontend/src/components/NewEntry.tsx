const addDiary = (event) => {
  event.preventDefault();
}

const NewEntry = () => {
  return (
    <>
      <form onSubmit={addDiary}>
        date: <input type="text"></input><br />
        visibility: <input type="text"></input><br />
        weather: <input type="text"></input><br />
        comment: <input type="text"></input><br />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default NewEntry;
