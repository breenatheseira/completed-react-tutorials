import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import store from '../stores/store.js'
import { Provider } from 'react-redux'
import '../features/todos/utils/server.js'

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

const basePath = import.meta.env.VITE_REPO_NAME;

const router = createBrowserRouter([
  {
    path: basePath,
    children: [
      {
        index: true, element: <Home />,
      },
      { path: 'counter-tutorial',
        element: <Counter />
      },
      { path: 'todos-tutorial',
        element: <Todo />
      },
      { path: 'contacts-tutorial',
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
    ]
  },
  { path: '*',
    element: <NoMatch />
  },
  ],
  // Can't redirect to / if the users removed it from window.location
  // {
  //   basename: basePath
  // }
)

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
    <div id="homepage-root">
      <h1>Welcome to Tutorials Done</h1>
      <p>Click on the links below to explore the results of the tutorials:</p>
      <div>
        <Link to={basePath + 'counter-tutorial'}>
          React-Redux Counter Tutorial
        </Link>
      </div>
      <div>
        <Link to={basePath + 'todos-tutorial'}>
          React-Redux Todos Tutorial
        </Link>
      </div>
      <div>
        <Link to={basePath + 'contacts-tutorial'}>
          React-Router Contacts Tutorial
        </Link>
      </div>
    </div>
  )
}

function NoMatch() {
  console.log('homepage: ', basePath)
  return (
    <div id="homepage-root">
      <h2>Nothing to see here.</h2>
      <p>
        <Link to={basePath}>Go to the home page.</Link>
      </p>
    </div>
  );
}

export default App
