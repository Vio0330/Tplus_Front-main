import styled from 'styled-components';

import Modal from '../Modal';

import ModalTitle from '../ui/ModalTitle';
import ModalContent from '../ui/ModalContent';
import ModalButton from '../ui/ModalButton';

const SaveTestPaperModalContent = styled(ModalContent)`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ExitButton = styled(ModalButton)`
  background: ${(props) => props.theme.colors.gray400};
  margin-top: 1rem;
`;

type SaveTestPaperModalProps = {
  show: boolean;
  titleText: string;
  buttonText: string;
  onClickSave: () => void;
  onClickCloseModal: () => void;
}

export default function SaveTestPaperModal({
  show, titleText, buttonText, onClickSave, onClickCloseModal,
}: SaveTestPaperModalProps) {
  const handleClickSave = () => {
    onClickSave();
  };

  const handleClickExit = () => {
    window.location.href = '/papers';
  };

  return (
    <Modal
      show={show}
      onClose={onClickCloseModal}
    >
      <ModalTitle>
        {titleText}
      </ModalTitle>
      <SaveTestPaperModalContent>
        저장되지 않은 내용이 있습니다.
        <br />
        저장 하시겠습니까?
      </SaveTestPaperModalContent>
      <ModalButton
        type="button"
        onClick={handleClickSave}
      >
        {buttonText}
      </ModalButton>
      <ExitButton
        type="button"
        onClick={handleClickExit}
      >
        저장하지 않고 나가기
      </ExitButton>
    </Modal>
  );
}
