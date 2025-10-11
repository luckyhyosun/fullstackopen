import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'
import noteService from './services/notes'
import App from './App'

const store = createStore(noteReducer)

noteService.getAll().then(notes => notes.forEach(note => {
  store.dispatch({type: 'ADD_NOTE', payload: note.content})

  console.log(store.getState())
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
