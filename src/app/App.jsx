import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import store from '../stores/store.js'
import { Provider } from 'react-redux'
import '../utils/server.js'

import Counter from '../features/counter/Counter'
import Todo from '../features/todos/Todo'
import { fetchTodos } from '../features/todos/todoSlice.js'

import ContactsRoot, { loader as rootLoader, action as rootAction } from './routes/contacts-root'
import ErrorPage from './routes/error-page'
import Contact, { loader as contactLoader, action as contactAction } from '../features/contacts/contact.jsx'
import EditContact, { action as editAction } from '../features/contacts/edit.jsx'
import { action as destroyAction } from '../features/contacts/destroy.jsx'
import ContactsIndex from '../features/contacts/contacts-index.jsx'

store.dispatch(fetchTodos())

const router = createBrowserRouter([
  { path: '/',
    element: <Home />
  },
  { path: '/counter-tutorial',
    element: <Counter />
  },
  { path: '/todos-tutorial',
    element: <Todo />
  },
  { path: '/contacts-tutorial',
    element: <ContactsRoot />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          {
            index: true, element: <ContactsIndex/>
          },
          {
            path: 'contacts/:contactId',
            element: <Contact/>,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact/>,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          }
        ]
      }
    ]
  },
  { path: '*',
    element: <NoMatch />
  }
])

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

function Home(){
  return (
    <div>
      <h1>Welcome to Tutorials Done</h1>
      <p>Click on the links below to explore the results of the tutorials:</p>
      <div>
        <Link to='/counter-tutorial'>
          React-Redux Counter Tutorial
        </Link>
      </div>
      <div>
        <Link to='/todos-tutorial'>
          React-Redux Todos Tutorial
        </Link>
      </div>
      <div>
        <Link to='/contacts-tutorial'>
          React-Router Contacts Tutorial
        </Link>
      </div>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App
