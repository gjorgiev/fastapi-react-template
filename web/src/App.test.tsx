import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('App UI', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, title: 'Test Note', content: 'This is a test note.' }]),
      })
    ) as unknown as typeof fetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the heading', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/My Notes/i)).toBeInTheDocument()
    })
  })

  it('renders the note input fields', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Content/i)).toBeInTheDocument()
    })
  })
})
