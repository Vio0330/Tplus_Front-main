import { render, screen } from '@testing-library/react';

import Link from './Link';

describe('Link', () => {
  it('renders children', () => {
    render((
      <Link to="/">
        Home
      </Link>
    ));

    screen.getByText('Home');
    screen.getByRole('link');
  });
});
