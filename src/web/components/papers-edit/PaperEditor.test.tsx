import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import { PaperDetail } from '../../types';

import PaperEditor from './PaperEditor';

const paperDetail: PaperDetail = {
  id: 123,
  name: '시험지 제목',
  type: '내신',
  grade: '고1',
  school: '휘문고등학교',
  passages: [
    {
      title: '지문 제목',
      number: 1,
      questions: [
        {
          number: 1,
          type: '문제 유형',
        },
        {
          number: 2,
          type: '문제 유형',
        },
      ],
    },
  ],
};

jest.mock('../../hooks/usePaperEdit.ts', () => jest.fn(() => ({
  paperDetail,
  addPassage: jest.fn(),
  removePassage: jest.fn(),
})));

describe('PaperEditor', () => {
  const questionType = [
    { name: '어법' },
  ];

  it('renders PaperEditor', () => {
    render(<PaperEditor questionType={questionType} />);

    screen.getByText(/본문 직접 입력/);
    screen.getByText(/문제 추가/);
    screen.getByText(/지문 추가/);
  });
});
