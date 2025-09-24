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

module.exports = noteReducer
