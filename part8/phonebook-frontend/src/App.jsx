import Notification from './components/Notification'
import Users from './components/Users'
import NewUser from './components/NewUser'
import Filter from './components/Filter'

function App() {
  return (
    <>
      <h2>Phonebook with GraphQL</h2>
      <Notification />
      <Users />
      <NewUser />
      <Filter />
    </>
  )
}

export default App
