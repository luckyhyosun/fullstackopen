const noteReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_NOTE':
      return [...state, action.payload]
    default:
      return state
  }
}

export const addNoteAction = (content) => ({
  type: 'ADD_NOTE',
  payload: {
    id: Math.floor(Math.random()*100),
    content,
    important: true
  }
})

export default noteReducer
