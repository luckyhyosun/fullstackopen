import { useState } from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books || []
  const [selectedGenre, setSelectedGenre] = useState('all')

  const allGenres = Array.from(new Set(books.flatMap((b) => b.genres || [])))

  const displayedBooks =
    selectedGenre === 'all'
      ? books
      : books.filter((b) => (b.genres || []).includes(selectedGenre))

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

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setSelectedGenre('all')}
          disabled={selectedGenre === 'all'}
        >
          all
        </button>
        {allGenres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            disabled={selectedGenre === g}
            style={{ marginLeft: 8 }}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
