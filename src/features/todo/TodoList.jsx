import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

const TodoList = () => {
  const todos = useSelector(state => state.todos)

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
