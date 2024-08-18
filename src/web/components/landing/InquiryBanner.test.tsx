import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import InquiryBanner from './InquiryBanner';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('InquiryBanner', () => {
  it('renders Inquiry Banner', () => {
    render(<InquiryBanner />);

    screen.getByText(/언제든 이용 문의해주세요/);
    screen.getByText(/어떤 내용이든지 문의해주시면 친절한 답변 드립니다/);
    screen.getByText(/이메일/);
  });

  it('listens for inquiry button click event', () => {
    render(<InquiryBanner />);

    fireEvent.click(screen.getByText('서비스 이용하기'));

    push('/papers');
  });
});
