import styled from 'styled-components';

import { Passage, Question } from '../../types';

import usePaperEdit from '../../hooks/usePaperEdit';

import GrayButton from '../ui/GrayButton';
import WhiteButton from '../ui/WhiteButton';

const Container = styled.div`
  padding-left: 2.4rem;
  width: 28%;
`;

const DeleteButton = styled(GrayButton)`
  padding-block: .65rem;
  width: 6rem;
  white-space: nowrap;
`;

const AddPassageButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.2rem;
`;

const AddPassageButton = styled(WhiteButton)`
  width: 10.3rem;
  height: 3.2rem;
  padding: .6rem 1.6rem .6rem .8rem;
  white-space: nowrap;
  
  img {
    filter: brightness(0) saturate(100%) invert(65%) sepia(27%) saturate(4694%) hue-rotate(342deg) brightness(98%) contrast(99%);
    margin-right: .2rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 66.1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 3.2rem;
  margin-block: 1.6rem;
`;

const ListItem = styled.div` 
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
`;

const PassageListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PassageListTitle = styled.button`
  font-size: 1.6rem;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  column-gap: .8rem;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  padding-left: 3.2rem;
`;

const QuestionListItem = styled.div`
  font-size: 1.6rem;
  display: flex;
  column-gap: .8rem;
  align-items: center;
`;

type PassageListProps = {
  selectedPassageNumber: number;
  onSelectPassage: (number: number) => void;
}

export default function PassageList({
  selectedPassageNumber,
  onSelectPassage,
}: PassageListProps) {
  const {
    paperDetail, addPassage, removePassage,
  } = usePaperEdit();

  const { passages } = paperDetail;

  const handleClickAddPassage = () => {
    addPassage();
  };

  const handleClickDelete = (number: number) => {
    removePassage(number);
  };

  return (
    <Container>
      <AddPassageButtonWrapper>
        <AddPassageButton
          type="button"
          onClick={handleClickAddPassage}
        >
          <img src="/images/icons/add.svg" alt="" />
          지문 추가
        </AddPassageButton>
      </AddPassageButtonWrapper>
      <ListWrapper>
        {passages.map((passage:Passage, index: number) => (
          <ListItem key={passage.number}>
            <PassageListItem>
              <PassageListTitle
                type="button"
                onClick={() => onSelectPassage(passage.number)}
              >
                {selectedPassageNumber === passage.number
                || (selectedPassageNumber === 0 && index === 0)
                  ? <img alt="" src="/images/icons/sort-active.svg" />
                  : <img alt="" src="/images/icons/sort-inactive.svg" />}
                {passage.title}
              </PassageListTitle>
              { index !== 0 ? (
                <DeleteButton
                  type="button"
                  onClick={() => handleClickDelete(passage.number)}
                >
                  삭제
                </DeleteButton>
              ) : null}
            </PassageListItem>
            <QuestionList key={QuestionList.number}>
              {passage.questions.map((quetion: Question) => (
                <QuestionListItem key={quetion.number}>
                  <img alt="" src="/images/icons/quiz.svg" />
                  문제
                  {' '}
                  {quetion.number}
                </QuestionListItem>
              ))}
            </QuestionList>
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
}
