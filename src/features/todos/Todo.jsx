import React from "react"
import Header from "./components/header/Header"
import TodoList from "./TodoList"
import Footer from "./components/footer/Footer"
import './assets/todo.css'

const Todo = () => {
  return (
    <>
      <div className="card">
        <h2>Todos</h2>
      </div>
      <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </>
  )
}

export default Todo;