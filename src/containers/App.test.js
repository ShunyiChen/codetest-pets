import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Loading div', () => {
  render(<App />);
  const linkElement = screen.getByText('Loading');
  expect(linkElement).toBeInTheDocument();
});
