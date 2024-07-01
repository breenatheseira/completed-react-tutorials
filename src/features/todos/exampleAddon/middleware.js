// middleware are intended to contain logic with side effects

export default function exampleMiddleware(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action)
    }
  }
}

const anotherExampleMiddleware = storeAPI => next => action => {
  // Do something in here, when each action is dispatched
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}
/* Another example */
const alwaysReturnHelloMiddleware = storeAPI => next => action => {
  const originalResult = next(action)
  // Ignore the original result, return something else
  return 'Hello!'
}

// const middlewareEnhancer = applyMiddleware(alwaysReturnHelloMiddleware)
// const store = createStore(rootReducer, middlewareEnhancer)

// const dispatchResult = store.dispatch({ type: 'some/action' })
// console.log(dispatchResult) // log: 'Hello!'

/* Another example */
const delayedMessageMiddleware = storeAPI = next = action => {
  if(action.type === 'todos/todoAdded'){
    setTimeout(() => {
      console.log('Added a new todo', action.payload)
    }, 1000);
  }
  return next(action)
}

/* Thunk Middleware */ 

const reduxThunkMiddleware = storeAPI => next => action => {
  // If 'action' is actually a function...
  if(typeof action === 'function'){
    // call the function, pass 'dispatch' and 'getState' as args
    // then return whatever the thunk function returns
    return action(storeAPI.dispatch, storeAPI.getState)
  }
  // Otherwise, it's a normal action, send it onwards
  return next(action)
}