import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}?_limit=5`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()

    const taskText = taskInput.trim()
    if (!taskText) return

    // Create optimistic task with temporary ID
    const optimisticTask = {
      id: Date.now(),
      title: taskText,
      completed: false,
      userId: 1
    }

    // Optimistically update UI
    setTasks([optimisticTask, ...tasks])
    setTaskInput('')

    // Send POST request
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskText,
          completed: false,
          userId: 1
        })
      })
      const newTask = await response.json()

      // Update with real task from server
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === optimisticTask.id ? newTask : task
        )
      )
    } catch (error) {
      console.error('Error adding task:', error)
      // Remove optimistic task on error
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== optimisticTask.id)
      )
    }
  }

  const toggleComplete = async (task) => {
    // Optimistically update UI
    setTasks(tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    ))

    // Send PUT request
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          completed: !task.completed
        })
      })
    } catch (error) {
      console.error('Error updating task:', error)
      // Revert on error
      setTasks(tasks.map(t =>
        t.id === task.id ? { ...t, completed: task.completed } : t
      ))
    }
  }

  const deleteTask = async (id) => {
    // Optimistically update UI
    setTasks(tasks.filter(task => task.id !== id))

    // Send DELETE request
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      // Could refetch tasks on error
      fetchTasks()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Team Task Manager</h1>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <form onSubmit={addTask} className="input-section">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Type a task name..."
                className="task-input"
              />
              <button type="submit" className="add-button">
                Add Task
              </button>
            </form>

            <div className="tasks-list">
              {tasks.length === 0 ? (
                <p className="empty-message">No tasks yet. Add one above!</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-info">
                      <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                        {task.title}
                      </h3>
                      <span className="task-status">
                        {task.completed ? '✓ Completed' : '○ Pending'}
                      </span>
                    </div>
                    <div className="task-buttons">
                      <button
                        onClick={() => toggleComplete(task)}
                        className="complete-button"
                      >
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
