import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders form with inputs and submit button', () => {
    render(<App />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

test('shows error messages on invalid input', () => {
  render(<App />);

  fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '123' } });
  fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

  const nameInput = screen.getByLabelText(/name/i);

  expect(nameInput).toHaveProperty('validity.patternMismatch', true);
  expect(nameInput).toHaveProperty('title', 'Name should not contain digits or special symbols');
});

test('submits form data correctly', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello, world!' } });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/submitted data/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hello, world!/i)).toHaveLength(2);
});
