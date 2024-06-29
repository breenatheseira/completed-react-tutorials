import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './features/counter/Counter'
import Todo from './features/todo/Todo'

function App() {

  return (
    <>
      <h1>Counter Example</h1>
      <div className="card">
        <Counter />
      </div>

      <h1>Todos Example</h1>
      <div className="card">
        <Todo />
      </div>
    </>
  )
}

export default App
