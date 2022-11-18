import { render, screen, waitFor } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  describe('Layout', () => {
    it('should show title', async () => {
      render(<Grid />);
      await waitFor(() => expect(screen.getAllByText('HANAR').length).toEqual(2));
    });
  });
});
