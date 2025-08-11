/**
 * Vitest + Testing Library test for AddTask component
 * Run with: npm test
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddTask from '../components/AddTask'

describe('AddTask', () => {
  it('renders and calls onAdd when submitted', async () => {
    const onAdd = vi.fn(() => Promise.resolve())
    render(<AddTask onAdd={onAdd} />)

    const title = screen.getByPlaceholderText('Title')
    const desc = screen.getByPlaceholderText('Description')
    const btn = screen.getByText('Add')

    fireEvent.change(title, { target: { value: 'Buy milk' } })
    fireEvent.change(desc, { target: { value: '2L whole milk' } })
    fireEvent.click(btn)

    // onAdd should have been called
    expect(onAdd).toHaveBeenCalled()
  })
})
