const NewUser = () => {
  const newUserStyle = {
    backgroundColor: "#C5E0ED",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const onAddUser = (e) => {
    e.preventDefault();
    console.log('add user clicked');
  }

  return (
    <div style={newUserStyle}>
      <h2>Add a New User</h2>
      <form onSubmit={onAddUser}>
        <label htmlFor='username'>Username: </label>
        <input type="text" id="username"/>
        <br />
        <label htmlFor='phoneNumber'>contact no: </label>
        <input type='text' id='phoneNumber'/>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewUser
