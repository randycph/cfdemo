import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  test('renders the demo heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Ship with confidence.' })).toBeInTheDocument()
  })

  test('responds to a deployment click', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /simulate deployment/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Deployment 1 passed locally.')
  })
})
