import React from "react"
import Header from "../header/Header"
import TodoList from "./TodoList"
import Footer from "../footer/Footer"
import './todo.css'

const Todo = () => {
  return (
    <>
      <h2>Todos</h2>
      <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </>
  )
}

export default Todo;