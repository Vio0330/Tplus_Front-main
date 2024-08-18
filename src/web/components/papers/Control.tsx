import { useState } from 'react';

import styled from 'styled-components';

import SelectBox from '../SelectBox';

import CreateTestPaperModal from './CreateTestPaperModal';

import OrangeButton from '../ui/OrangeButton';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 8rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
  padding-top: 3.2rem;
  padding-right: 15rem;
  column-gap: .8rem;
`;

const CreateButton = styled(OrangeButton)`
  width: 10.3rem;
  height: 3.2rem;
  white-space: nowrap;
`;

type ControlProps = {
  paperType: string;
  onSelect: (value: string) => void;
  schools: { name: string; region: string; }[];
}

export default function Control({ paperType, onSelect, schools }: ControlProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const handleClickClose = () => {
    setIsModalOpen(false);
  };

  const handleClickOption = ({ value }: {
    value: string;
  }) => {
    onSelect(value);
  };

  return (
    <Container>
      <SelectBox
        name="paperType"
        value={paperType}
        options={['전체', '내신', '수능']}
        onSelectOption={handleClickOption}
      />
      <CreateButton
        onClick={openModal}
        type="button"
      >
        <img alt="" src="/images/icons/add.svg" />
        새로 생성
      </CreateButton>
      <CreateTestPaperModal
        show={isModalOpen}
        titleText="시험지 생성하기"
        schools={schools}
        onClickClose={handleClickClose}
      />
    </Container>
  );
}
