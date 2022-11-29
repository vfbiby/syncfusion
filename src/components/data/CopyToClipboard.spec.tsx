import { beforeAll, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CopyToClipboard } from './CopyToClipboard';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {
    },
  },
});

describe('Copy to clipboard', () => {
  beforeAll(() => {
    vi.spyOn(navigator.clipboard, 'writeText');
  });

  it('should copy A to clipboard when click button A', async () => {
    render(<CopyToClipboard />);
    fireEvent.click(screen.getByText('A'));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('A'));
  });
});