import styled from 'styled-components';

import { useRouter } from 'next/router';

import Modal from '../Modal';

import ModalTitle from '../ui/ModalTitle';
import ModalContent from '../ui/ModalContent';
import ModalButton from '../ui/ModalButton';

const GenerateTestPaperModalContent = styled(ModalContent)`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

type GenerateTestPaperModalProps = {
  show: boolean;
  titleText: string;
  buttonText: string;
  onClose: () => void;
}

export default function GenerateTestPaperModal({
  show, titleText, buttonText, onClose,
}: GenerateTestPaperModalProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/papers');
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <ModalTitle>
        {titleText}
      </ModalTitle>
      <GenerateTestPaperModalContent>
        시험지가 생성 중입니다.
        <br />
        완료되면 카카오톡으로 알려드릴게요!
        <br />
        <br />
        *예상 소요 시간 : 30분
      </GenerateTestPaperModalContent>
      <ModalButton
        type="button"
        onClick={handleClick}
      >
        {buttonText}
      </ModalButton>
    </Modal>
  );
}
