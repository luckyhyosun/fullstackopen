import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import notReducer from './reducers/noteReducer'

const store = createStore(notReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
