import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'

import './utils/server.js'
import { fetchTodos } from './features/todos/todoSlice.js'

store.dispatch(fetchTodos())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
