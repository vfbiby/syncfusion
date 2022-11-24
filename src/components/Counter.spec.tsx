import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';
import { Provider } from 'react-redux';
import { store } from '../app/store';

function renderWithStore() {
  const Wrapper = () => <Provider store={store}>
    <Counter />
  </Provider>;
  render(<Wrapper />);
}

describe('Counter', function() {
  it('should increment number after clicking button', function() {
    renderWithStore();
    fireEvent.click(screen.getByRole('button', { name: 'Increment value' }));
    expect(screen.getByTitle('counter')).toHaveTextContent('1');
  });

  it('should decrement number after clicking button', function() {
    renderWithStore();
    fireEvent.click(screen.getByRole('button', { name: 'Decrement value' }));
    expect(screen.getByTitle('counter')).toHaveTextContent('0');
  });
});