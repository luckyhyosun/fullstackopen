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

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const addNote = event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    })
  }

  const toggleImportance = id => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }

  return(
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content}
            <button onClick={() => toggleImportance(note.id)}>
              {note.important ? 'important' : 'Not important'}
            </button>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App
