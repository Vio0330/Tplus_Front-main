import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Partners from './Partners';

describe('Parnter', () => {
  it('renders title', () => {
    render(<Partners />);

    screen.getByText(/협력 기관 및 협력사/);
  });
});
