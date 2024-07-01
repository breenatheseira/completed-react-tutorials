import { client } from '../utils/client'

const delayedActionMiddleware = storeAPI => next => action => {
  if(action.type === 'todos/todoAdded' ){
    setTimeout(() => {
      // Delay this action by 1 second
      next(action)
    }, 1000)
    return
  }

  return next(action)
}

const fetchTodosMiddleware = storeAPI => next => action => {
  if(action.type === 'todos/fetchTodos'){
    // Make an API call to fetch todos from the server
    client.get('todos').then(todos => {
      // Dispatch an action with the todos received
      storeAPI.dispatch({ type: 'todos/todosLoaded', payload: todos })
    })
  }

  return next(action)
}

// action is a function to be called in the middleware
const asyncFunctionMiddleware = storeAPI => next => action => {
  // If the 'action' is actually a function instead...
  if(typeof action === 'function'){
    // then call the function and pass 'dispatch' and 'getState' as arguments
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  // Otherwise, it's a normal action
  return next(action)
}

// how it's used:
// const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
// const store = createStore(rootReducer, middlewareEnhancer)

// write a function with a `dispatch` and `getState` args
// const fetchSomeData = (dispatch, getState) => {
//   // Make async HTTP req
//   client.get('todos').then(todos => {
//     dispatch({ type: 'todos/todosLoaded', payload: todos })
//     const allTodos = getState().todos
//     console.log('Number of Todos after loading: ', allTodos.length)
//   })
// }

// // Pass the function to 'dispatch'
// store.dispatch(fetchSomeData)
// // logs: Number of Todos after loading: ###