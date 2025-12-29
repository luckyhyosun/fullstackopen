import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
  allAuthors{
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author{
      name
    }
    published
    genres
  }
}
`
export const ADD_BOOK = gql`
mutation addBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String!]!
) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`
export const UPDATE_YEAR = gql`
mutation updateAuthor(
  $name: String!,
  $setBornTo: Int!
){
  editAuthor(name: $name, setBornTo: $setBornTo){
    name
    id
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login(
  $username: String!,
  $password:String!
){
  login(username:$username, password:$password){
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`
