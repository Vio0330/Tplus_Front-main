import { useEffect } from 'react';

import styled from 'styled-components';

import { useRouter } from 'next/router';

import { postTestPaper } from '../../services/apiService';

import Modal from '../Modal';
import SelectBox from '../SelectBox';
import Schools from './Schools';

import ModalTitle from '../ui/ModalTitle';
import ModalContent from '../ui/ModalContent';
import ModalButton from '../ui/ModalButton';
import useCreatePaper from '../../hooks/useCreatePaper';

const CreateTestPaperModalContent = styled(ModalContent)`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  align-items: center;
`;

const Classification = styled.div`
  display: flex;
  justify-content: space-between;
  width: 27.7rem;
  align-items: center;
`;

const CreateButton = styled(ModalButton)`
  &:disabled {
    background: ${(props) => props.theme.colors.orange40};
  }
`;

type CreateTestPaperModalProps = {
  show: boolean;
  titleText: string;
  schools: { name: string; region: string; }[];
  onClickClose: () => void;
}

export default function CreateTestPaperModal({
  show, titleText, schools, onClickClose,
}: CreateTestPaperModalProps) {
  const router = useRouter();

  const name = '시험지 제목';

  const {
    paper, isValid, handleSelectOption, clear,
  } = useCreatePaper();

  const { type, grade, school } = paper;

  useEffect(() => {
    clear();
  }, [show]);

  const handleClickCreateButton = async () => {
    try {
      const paperId = await postTestPaper({
        name, type, grade, school,
      });

      if (paperId) {
        router.push(`papers/${paperId}/edit`);
      }
    } catch (error) {
      // TODO: 에러처리
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClickClose}
    >
      <ModalTitle>
        {titleText}
      </ModalTitle>
      <CreateTestPaperModalContent>
        <Classification>
          <label htmlFor="classificationTest">시험지 분류</label>
          <SelectBox
            name="type"
            value={type}
            options={['내신', '수능']}
            onSelectOption={handleSelectOption}
          />
        </Classification>
        <Classification>
          <label htmlFor="grade">학년</label>
          <SelectBox
            name="grade"
            value={grade}
            options={['고1', '고2', '고3']}
            onSelectOption={handleSelectOption}
          />
        </Classification>
        {type === '내신' && (
          <Schools
            name="school"
            value={school || ''}
            schools={schools}
            clear={!show}
            onSelectOption={handleSelectOption}
          />
        )}
      </CreateTestPaperModalContent>
      <CreateButton
        type="button"
        onClick={handleClickCreateButton}
        disabled={!isValid()}
      >
        생성하기
      </CreateButton>
    </Modal>
  );
}
