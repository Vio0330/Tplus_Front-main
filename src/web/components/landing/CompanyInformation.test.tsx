import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import CompanyInformation from './CompanyInformation';

describe('CompanyInformation', () => {
  it('renders company information', () => {
    render(<CompanyInformation />);

    screen.getByText(/헥사플러스/);
    screen.getByText(/서울시 강남구/);
  });
});
