import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import PaperList from './PaperList';
import { Paper } from '../../types';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

function renderPaperList(papers: Paper[]) {
  render(<PaperList papers={papers} />);
}

const context = describe;
describe('PaperList', () => {
  const papers = [
    {
      id: 1,
      name: '휘문고등학교 내신',
      type: '내신',
      grade: '고3',
      school: '휘문고등학교',
      downloadUri: '',
      updatedAt: '2024.03.29',
      status: '제작중',
    },
    {
      id: 2,
      name: '고1 모의고사 1일차',
      type: '수능',
      grade: '고1',
      school: '-',
      downloadUri: '',
      updatedAt: '2024.03.29',
      status: '생성중',
    },
  ];

  it('renders paper list', () => {
    renderPaperList(papers);

    screen.getByText(/마지막 편집일/);
    screen.getByText(/휘문고등학교 내신/);
  });

  context('without papers', () => {
    it('renders empty message', () => {
      renderPaperList([]);

      screen.getByText(/생성된 파일이 없습니다. 새로 생성해주세요./);
    });
  });
});
