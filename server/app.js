const express = require('express')

const app = express()
app.use(express.json())

let nextTaskId = 3
let tasks = [
  { id: 1, title: 'Confirm release notes', completed: false },
  { id: 2, title: 'Run the full test suite', completed: true }
]

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/message', (req, res) => {
  res.status(200).json({ message: 'Hello from the Express API' })
})

app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks)
})

app.post('/api/tasks', (req, res) => {
  const title = req.body?.title?.trim()

  if (!title) {
    return res.status(400).json({ error: 'A task title is required' })
  }

  const task = { id: nextTaskId++, title, completed: false }
  tasks.push(task)
  return res.status(201).json(task)
})

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id))

  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }

  if (typeof req.body.completed === 'boolean') {
    task.completed = req.body.completed
  }

  if (typeof req.body.title === 'string' && req.body.title.trim()) {
    task.title = req.body.title.trim()
  }

  return res.status(200).json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex((item) => item.id === Number(req.params.id))

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  tasks.splice(taskIndex, 1)
  return res.status(204).send()
})

app.resetTasks = () => {
  nextTaskId = 3
  tasks = [
    { id: 1, title: 'Confirm release notes', completed: false },
    { id: 2, title: 'Run the full test suite', completed: true }
  ]
}

module.exports = app
