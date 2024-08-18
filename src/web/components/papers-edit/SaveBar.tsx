import { useState } from 'react';

import styled from 'styled-components';

import WhiteButton from '../ui/WhiteButton';
import OrangeButton from '../ui/OrangeButton';

import GenerateTestPaperModal from './GenerateTestPaperModal';

const Container = styled.div`
  height: 10.3rem;
  padding: 2.5rem 3.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SaveButton = styled(WhiteButton)`
  margin-right: 1.6rem;
  width: 9.8rem;
  height: 5.4rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

const CreateButton = styled(OrangeButton)`
  height: 5.4rem;
  width: 15.2rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

type SaveBarProps = {
  isLoading: boolean;
  onClickSave: () => void;
  onClickGenerate: () => void;
}

export default function SaveBar({
  isLoading, onClickSave, onClickGenerate,
}: SaveBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container>
        <SaveButton
          type="button"
          onClick={onClickSave}
          disabled={isLoading}
        >
          저장
        </SaveButton>
        <CreateButton
          type="button"
          onClick={onClickGenerate}
          disabled={isLoading}
        >
          시험지 생성
        </CreateButton>
      </Container>
      <GenerateTestPaperModal
        show={isModalOpen}
        titleText="시험지 생성하기"
        buttonText="확인"
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
