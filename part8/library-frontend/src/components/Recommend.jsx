const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendataion</h2>
      <p>Books in your favorite genre is... <span style={{fontWeight: "bold"}}>this</span></p>
    </div>
  )
}

export default Recommend
