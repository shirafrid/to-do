import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to GitHub Pages', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  const [count, setCount] = useState(0)

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <>
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>React + GitHub Pages Demo</h1>

      <div className="card">
        <h2>Interactive Counter</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          Clicked {count} times
        </button>
      </div>

      <div className="card todo-card">
        <h2>Todo List</h2>
        <p className="stats">
          {completedCount} of {todos.length} tasks completed
        </p>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="read-the-docs">
        This is a sample React app deployed on GitHub Pages
      </p>
    </>
  )
}

export default App
