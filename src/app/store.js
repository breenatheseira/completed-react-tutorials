import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todosReducer from '../features/todo/todoSlice'
import filtersReducer from '../features/filters/filtersSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    filters: filtersReducer,
  },
})