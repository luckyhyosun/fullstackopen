import { createStore } from 'redux'

const noteReducer = (state=[], action) => {
  switch (action.type){
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const foundNote = state.find(note => note.id === id)
      const updatedNote = {...foundNote, important: !foundNote.important}
      return state.map(note => note.id !== id ? note : updatedNote)
    }
    default:
      return state
  }
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <button>{note.important ? 'important' : 'Not important'}</button>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App
