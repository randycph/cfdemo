const request = require('supertest')
const app = require('./app')

describe('Express API', () => {
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
})
