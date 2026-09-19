import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  test('renders the demo heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Ship with confidence.' })).toBeInTheDocument()
  })

  test('creates, completes, and removes a checklist task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New task'), 'Review deployment log')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    const checkbox = screen.getByRole('checkbox', { name: 'Review deployment log' })
    await user.click(checkbox)

    expect(checkbox).toBeChecked()

    const taskRow = screen.getByText('Review deployment log').closest('li')
    await user.click(within(taskRow).getByRole('button', { name: 'Remove' }))

    expect(screen.queryByText('Review deployment log')).not.toBeInTheDocument()
  })
})
