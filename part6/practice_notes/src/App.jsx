import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: () => axios.get('http://localhost:3001/notes').then(res => res.data)
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading now...</div>
  }

  const notes = result.data

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes notes={notes}/>
    </div>
  )
}

export default App
