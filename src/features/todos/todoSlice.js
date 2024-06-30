import { client } from '../../utils/client'
import { createSelector } from 'reselect'

// Do not import todoSlice into filtersSlice; otherwise a cyclic import dependency will happen
import { StatusFilters } from '../filters/filtersSlice'

const initialState = {
  status: 'idle', // or: 'loading', 'succeeded', 'failed'
  entities: {}
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Return a new todos state array with the new todo item at the end
      const todo = action.payload
      return {
        ...state,
        entities: { 
          ...state.entities, 
          [todo.id]: todo
        }
      }
    }
    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed
          }
        }
      }
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color
          }
        }
      }
    }
    case 'todos/todoDeleted': {
      const newEntities = { ...state.entities }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/allCompleted': {
      const newEntities = state.entities
      Object.values(newEntities).forEach(todo => {
        newEntities[todo.id] = {
          ...todo,
          completed: true
        }
      })
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/completedCleared': {
      const newEntities = state.entities
      Object.values(newEntities).forEach(todo => {
        if(todo.completed){
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading'
      }
    }
    case 'todos/todosLoaded': {
      // Replace existing state by returning the new value
      const newEntities = {}
      action.payload.forEach(todo => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities
      }
    }
    default:
      return state
  }
}

const selectTodosEntities = state => state.todos.entities

export const selectTodos = createSelector(selectTodosEntities, entities => Object.values(entities))
export const selectTodoById = (state, todoId) => {
  return selectTodosEntities(state)[todoId]
}

// Memoizing (caching) Selectors
export const selectTodoIds = createSelector(
  // Pass 1 or more input selector functions:
  selectTodos,
  // then write output selector that receivers all input results as args 
  //  & returns the final value
  todos => todos.map(todo => todo.id)
)

export const incompleteTodos = createSelector(
  selectTodos,
  todos => todos.filter(todo => !todo.completed)
)

const selectFilteredTodos = createSelector(
  // 1st input selector: all todos
  selectTodos,
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
export const todosLoading = () => ({ type: 'todos/todosLoading' })
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
  dispatch(todosLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
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