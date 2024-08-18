import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Services from './Services';

describe('Services', () => {
  it('renders service guide', () => {
    render(<Services />);

    screen.getByText(/품질 높은 수능형 영어 지문과 문항을/);
    screen.getByText(/학교 시험 유형에/);
    screen.getByText(/편집하기 쉬운/);
  });

  it('renders banner message', () => {
    render(<Services />);

    screen.getByText(/선생님이 수업과 학생에 더/);
  });
});
