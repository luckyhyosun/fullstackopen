import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)

  const userResult = useQuery(ALL_AUTHORS);
  const bookResult = useQuery(ALL_BOOKS)

  const client = useApolloClient();

  if (userResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>

        <Authors show={page === "authors"} authors={userResult.data.allAuthors}/>
        <Books show={page === "books"} books={bookResult.data.allBooks}/>
        <Login show={page === "login"} setToken={setToken}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} authors={userResult.data.allAuthors}/>
      <Books show={page === "books"} books={bookResult.data.allBooks}/>
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"}/>
    </div>
  );
};

export default App;
