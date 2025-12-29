const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books || []
  const displayedBooks = books.filter((b) => (b.genres || []).includes(props.loggedinUser.favoriteGenre))

  return (
    <div>
      <h2>recommendataion</h2>
      <p>Books in
        <span style={{fontWeight: "bold"}}> {props.loggedinUser.username} </span> favorite genre is...
        <span style={{fontWeight: "bold"}}> {props.loggedinUser.favoriteGenre}</span>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {displayedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{(a.genres || []).join(' / ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
