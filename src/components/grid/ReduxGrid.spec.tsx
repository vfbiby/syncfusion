import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReduxGrid } from './ReduxGrid';
import { Provider } from 'react-redux';
import { createStore } from '../../app/store';
import { vi } from 'vitest';

describe('ReduxGrid', function() {
  it('should show button', function() {
    render(<Provider store={createStore()}><ReduxGrid /></Provider>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('click button should show data', async function() {
    vi.useFakeTimers();
    render(<Provider store={createStore()}><ReduxGrid /></Provider>);
    fireEvent.click(screen.getByRole('button'));
    vi.runAllTimers();
    await waitFor(() => {
      expect(screen.getByText('james')).toBeInTheDocument();
    });
  });
});