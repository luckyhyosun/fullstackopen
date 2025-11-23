import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

function Persons({persons}) {
  return(
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} - {p.phone}
        </div>
      )}
    </div>
  )
}

function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons = {result.data.allPersons}/>
    </div>
  )
}

export default App
