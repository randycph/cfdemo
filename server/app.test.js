const request = require('supertest')
const app = require('./app')

describe('Express API', () => {
  beforeEach(() => app.resetTasks())

  test('GET /api/health returns a healthy status', async () => {
    const response = await request(app).get('/api/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ status: 'ok' })
  })

  test('GET /api/message returns the demo message', async () => {
    const response = await request(app).get('/api/message')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello from the Express API' })
  })

  test('creates, updates, and deletes a task', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Deploy the client' })

    expect(created.status).toBe(201)
    expect(created.body).toEqual({ id: 3, title: 'Deploy the client', completed: false })

    const updated = await request(app)
      .patch('/api/tasks/3')
      .send({ completed: true })

    expect(updated.status).toBe(200)
    expect(updated.body.completed).toBe(true)

    const deleted = await request(app).delete('/api/tasks/3')
    expect(deleted.status).toBe(204)
  })

  test('rejects a task without a title', async () => {
    const response = await request(app).post('/api/tasks').send({ title: '  ' })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'A task title is required' })
  })
})
