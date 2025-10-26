const Filter = () => {
  const filterStyle = {
    backgroundColor: "#7FBAD7",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  return (
    <div style={filterStyle}>
      <h2>Filter User</h2>
      <label htmlFor="filter">Filter shown with </label>
      <input type="text" id="filter" />

      <h2>Filter Result</h2>
    </div>
  )
}

export default Filter
