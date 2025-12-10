import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState("authors");
  const userResult = useQuery(ALL_AUTHORS);
  const bookResult = useQuery(ALL_BOOKS)

  if (userResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  console.log(userResult);
  console.log(bookResult)

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={userResult.data.allAuthors}/>
      <Books show={page === "books"} books={bookResult.data.allBooks}/>
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
