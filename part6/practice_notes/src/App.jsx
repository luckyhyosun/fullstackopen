import FilterContext from './FilterContext'
import filterReducer from './reducers/filterReducer'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import { useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'
import { getNotes } from './requests'

const App = () => {
  const [filter, filterDispatch] = useReducer(filterReducer, 'ALL')

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    //optimizing the performance
    refetchOnWindowFocus: false
  })

  // console.log(filter);
  // console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading now...</div>
  }

  let notes
  if(filter === 'ALL'){
    notes = result.data
  }else if(filter === 'IMPORTANT'){
    notes = result.data.filter(note => note.important)
  }else{
    notes = result.data.filter(note => !note.important)
  }

  return(
    <FilterContext.Provider value={[filter, filterDispatch]}>
      <NewNote />
      <VisibilityFilter />
      <Notes notes={notes}/>
    </FilterContext.Provider>
  )
}

export default App
