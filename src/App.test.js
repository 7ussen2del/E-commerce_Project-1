import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

test('renders FreshCart login page', () => {
  render(<App />);

  const loginElement = screen.getByText(/login now/i);

  expect(loginElement).toBeInTheDocument();
});