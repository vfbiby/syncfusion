import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Orders } from './Orders';
import { Provider } from 'react-redux';
import { createStore } from '../../app/store';
import { vi } from 'vitest';

describe('ReduxGrid', function() {
  it('should show button', function() {
    render(<Provider store={createStore()}><Orders /></Provider>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('click button should show data', async function() {
    vi.useFakeTimers();
    render(<Provider store={createStore()}><Orders /></Provider>);
    fireEvent.click(screen.getByText('fetch'));
    vi.runAllTimers();
    await waitFor(() => {
      expect(screen.getByText('VINET')).toBeInTheDocument();
    });
  });
});