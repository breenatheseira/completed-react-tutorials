import { client } from '../../utils/client'

const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Return a new todos state array with the new todo item at the end
      return [...state, action.payload]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoaded': {
      // Replace existing state by returning the new value
      return action.payload
    }
    default:
      return state
  }
}

// Action Creators
export const todoToggled = todoId => ({ type: 'todos/todoToggled', payload: todoId })
export const colorSelected = (color, todoId) => ({ type: 'todos/colorSelected', payload: { color, todoId } })
export const todoDeleted = todoId => ({ type: 'todos/todoDeleted', payload: todoId })

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' })
export const allCompletedTodosCleared = () => ({ type: 'todos/completedCleared' })

export const todosLoaded = todos => {
  return {
    type: 'todos/todosLoaded',
    payload: todos
  }
}

export const todoAdded = todo => {
  return {
    type: 'todos/todoAdded',
    payload: todo
  }
}
// or
// export const todoAdded = todo => ({ type: 'todo/todoAdded', payload: todo })

// thunk functions

export const fetchTodos = () => async (dispatch, getState) => {
// export function fetchTodos(){ // same syntax as above
// return async function fetchTodosThunk(dispatch, getState) {
  const response = await client.get('/fakeApi/todos')

  const stateBefore = getState()
  console.log('todos before dispatch: ', stateBefore.todos.length)

  dispatch(todosLoaded(response.todos))

  const stateAfter = getState()
  console.log('todos after dispatch: ', stateAfter.todos.length)
}

// export const saveNewTodo = (text) => async (dispatch, getState) => { // another way

// synchronous outer function receiving the 'text' params
export function saveNewTodo(text){
  // then creates an async thunk function
  return async function saveNewTodoThunk(dispatch, getState){
    // now use text value & send to the server
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}