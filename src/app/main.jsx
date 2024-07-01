import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from '../stores/store.js'
import { Provider } from 'react-redux'
// import App from './App.jsx'

import '../utils/server.js'
import { fetchTodos } from '../features/todos/todoSlice.js'

// React Router
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './routes/error-page'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contacts/contact'
import EditContact, { action as editAction } from './routes/contacts/edit'
import { action as destroyAction } from './routes/contacts/destroy'
import Index from './routes/contacts/index'

// store.dispatch(fetchTodos())

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
