const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books || []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(' / ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
