import { client } from '../../utils/client'
import { createSelector } from 'reselect'

// Do not import todoSlice into filtersSlice; otherwise a cyclic import dependency will happen
import { StatusFilters } from '../filters/filtersSlice'

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

export const selectTodos = state => state.todos
export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find(todo => todo.id === todoId)
}

// Memoizing (caching) Selectors
export const selectTodoIds = createSelector(
  // Pass 1 or more input selector functions:
  state => state.todos,
  // then write output selector that receivers all input results as args 
  //  & returns the final value
  todos => todos.map(todo => todo.id)
)

const selectFilteredTodos = createSelector(
  // 1st input selector: all todos
  state => state.todos,
  // 2nd input selector: current status filter
  state => state.filters,
  // output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0){
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active/ completed todos based on filter
    return todos.filter(todo => {
      const statusMatches = 
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  // Pass out other memoized selector as an input
  selectFilteredTodos,
  //  & derive data in the output selector
  filteredTodos => filteredTodos.map(todo => todo.id)
)

// Action Creators
export const todoToggled = todoId => ({ type: 'todos/todoToggled', payload: todoId })
export const todoColorChanged = (color, todoId) => ({ type: 'todos/colorSelected', payload: { color, todoId } })
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