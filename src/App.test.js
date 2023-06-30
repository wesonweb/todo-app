import { render, screen } from '@testing-library/react';
import App from './App';

describe ('App component', () => {
  test('App component renders', () => {
    render(<App />)

    expect(screen.getByText('Todo App', {exact: false})).toBeInTheDocument()
  })

  test('Check button renders', () => {
    render(<App />)
    const button = screen.getByRole('button')
    expect (button).toBeInTheDocument()
  })
})
