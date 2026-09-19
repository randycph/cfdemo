import { useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Confirm release notes', completed: false },
    { id: 2, title: 'Run the full test suite', completed: true }
  ])
  const [newTask, setNewTask] = useState('')
  const [message, setMessage] = useState('Ready for a verified deployment.')

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return

    setTasks((current) => [...current, { id: Date.now(), title, completed: false }])
    setNewTask('')
    setMessage('Task added to the release checklist.')
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
    setMessage('Task removed from the release checklist.')
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="app-shell">
      <section className="demo-panel" aria-labelledby="page-title">
        <div className="panel-heading">
          <p className="product-name">MONOLITH / CI-CD DEMO</p>
          <p className="environment">MAIN</p>
        </div>

        <div className="hero">
          <p className="eyebrow">RELEASE CHECKLIST</p>
          <h1 id="page-title">Ship with confidence. faileds</h1>
          <p className="intro">
            A small CRUD example for a React client, backed by a separately tested Express API.
          </p>
        </div>

        <ol className="pipeline" aria-label="Deployment pipeline">
          <li className="pipeline-step complete">
            <span className="step-number">01</span>
            <span>Install</span>
          </li>
          <li className="pipeline-step complete">
            <span className="step-number">02</span>
            <span>Test</span>
          </li>
          <li className={`pipeline-step ${completedCount === tasks.length && tasks.length ? 'complete' : 'ready'}`}>
            <span className="step-number">03</span>
            <span>Deploy</span>
          </li>
        </ol>

        <section className="task-area" aria-labelledby="tasks-title">
          <div className="task-heading">
            <h2 id="tasks-title">Tasks</h2>
            <span>{completedCount}/{tasks.length} complete</span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <label htmlFor="new-task">New task</label>
            <input
              id="new-task"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Describe a release task"
            />
            <button type="submit">Add task</button>
          </form>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? 'done' : ''}>{task.title}</span>
                </label>
                <button type="button" className="remove-button" onClick={() => removeTask(task.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="control-row">
          <p className="status" role="status">{message}</p>
        </div>

        <p className="boundary-note">
          The browser demo uses local state. GitHub Pages publishes the static client only; Express is tested and run locally.
        </p>
      </section>
    </main>
  )
}
