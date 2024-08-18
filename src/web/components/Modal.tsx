import { HTMLAttributes } from 'react';

import styled from 'styled-components';

type ContainerProps = {
  show: boolean;
}

const Container = styled.div<ContainerProps>`
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 100vw;
  min-width: ${(props) => props.theme.sizes.minWidth};
  height: 100vh;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.50);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 51.2rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 2.4rem;
  padding-top: 4.8rem;
  padding-inline: 2.4rem;
  width: 42.1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.colors.white};
  transform: translate(-50%, -50%);
`;

const CloseModalButton = styled.button`
  img {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
  }
`;

type ModalProps = HTMLAttributes<Element> & {
  show: boolean;
  onClose: () => void;
}

export default function Modal({
  show, children, onClose,
}: ModalProps) {
  return (
    <Container show={show}>
      <Wrapper>
        <CloseModalButton
          onClick={onClose}
          type="button"
        >
          <img alt="" src="/images/icons/close.svg" />
        </CloseModalButton>
        {children}
      </Wrapper>
    </Container>
  );
}
