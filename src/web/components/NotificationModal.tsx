import styled from 'styled-components';

import Modal from './Modal';

import ModalTitle from './ui/ModalTitle';
import ModalButton from './ui/ModalButton';

const Message = styled.p`
  font-size: 1.6rem;
  margin-top: 3.7rem;
  display: block;
  color: ${({ theme }) => theme.colors.gray800};
  text-align: center;
`;

type NotificationModalProps = {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onClickOk: () => void;
}

export default function NotificationModal({
  show, title, message, onClose, onClickOk,
}: NotificationModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <ModalTitle>
        {title}
      </ModalTitle>
      <Message>
        {message}
      </Message>
      <ModalButton
        type="button"
        onClick={onClickOk}
      >
        확인
      </ModalButton>
    </Modal>
  );
}
