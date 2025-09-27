const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE' :
      // using js array spread syntax
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE' :
      return state.map(note =>
        note.id === action.payload.id
        ? {...note, important: !action.payload.important}
        : note
      )
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer
