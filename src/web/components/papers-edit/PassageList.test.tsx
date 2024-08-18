import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import { PaperDetail } from '../../types';

import PassageList from './PassageList';

const paperDetail: PaperDetail = {
  id: 123,
  name: '시험지 제목',
  type: '내신',
  grade: '고1',
  school: '휘문고등학교',
  passages: [
    {
      title: '지문 1',
      number: 1,
      questions: [
        {
          number: 1,
          type: '문제 유형',
        },
      ],
    },
    {
      title: '지문 2',
      number: 2,
      questions: [
        {
          number: 1,
          type: '문제 유형',
        },
      ],
    },
  ],
};

const addPassage = jest.fn();
const removePassage = jest.fn();

jest.mock('../../hooks/usePaperEdit.ts', () => jest.fn(() => ({
  paperDetail,
  addPassage,
  removePassage,
})));

describe('PaperEditor', () => {
  const handleSelectPassage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PaperEditor', () => {
    render((
      <PassageList
        selectedPassageNumber={1}
        onSelectPassage={handleSelectPassage}
      />
    ));

    screen.getByText(/지문 추가/);
    screen.getByText(/지문 1/);
  });

  it('listens for add passage button click event', () => {
    render((
      <PassageList
        selectedPassageNumber={1}
        onSelectPassage={handleSelectPassage}
      />
    ));

    fireEvent.click(screen.getByText('지문 추가'));

    expect(addPassage).toBeCalled();
  });

  it('listens for delete button click event', () => {
    render((
      <PassageList
        selectedPassageNumber={1}
        onSelectPassage={handleSelectPassage}
      />
    ));

    fireEvent.click(screen.getByText('삭제'));

    expect(removePassage).toBeCalled();
  });
});
