import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

import { selectFilteredTodoIds } from './todoSlice'

const TodoList = () => {
  // don't do this, the map func always returns a reference, so the component will always re-render
  // const todoIds = useSelector(state => state.todos.map(todo => todo.id))
  const todoIds = useSelector(selectFilteredTodoIds)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
