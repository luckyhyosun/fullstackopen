const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendataion</h2>
      <p>Books in
        <span style={{fontWeight: "bold"}}> {props.loggedinUser.username} </span> favorite genre is...
        <span style={{fontWeight: "bold"}}> {props.loggedinUser.favoriteGenre}</span></p>
    </div>
  )
}

export default Recommend
