import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';
import Sort from './Sort';

const onChangeName = jest.fn();

describe('Sort', () => {
  it('renders sort', () => {
    render(<Sort name="시험지 제목" type="내신" grade="고1" school="휘문고등학교" onChangeName={onChangeName} />);

    screen.getByPlaceholderText(/시험지 제목/);
  });
});
