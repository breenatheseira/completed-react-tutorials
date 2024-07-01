import { createSlice } from '@reduxjs/toolkit'
import { todoAdded, todoToggled, todosLoading } from './todoSlice'

const initialState = {
  entities: [],
  status: null
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action){
      // mutating state is ok inside create slice - but is optional
      state.entities.push(action.payload)
    },
    todoToggled(state, action){
      const todo = state.entities.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action){
      // copying state is ok too!
      return {
        ...state,
        status: 'loading'
      }
    },
    // example to delete todo from the entities array
    todoDeleted(state,action){
      state.todos.entities = state.todos.entities.filter(todo => todo.id !== action.payload)
    }
  }
})

export const { todoAdded, todoToggled, todoLoading } = todosSlice.actions
// called like this:
// console.log(todoToggled(42))
// log: {type: 'todos/todoToggled', payload: 42}
export default todosSlice.reducer