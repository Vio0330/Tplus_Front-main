import styled from 'styled-components';

import { useRouter } from 'next/router';

import { toDate } from '../../utils';

import { Paper } from '../../types';

import { requestCopyPaper } from '../../services/apiService';

import WhiteButton from '../ui/WhiteButton';
import OrangeButton from '../ui/OrangeButton';
import GrayButton from '../ui/GrayButton';
import LightOrangeButton from '../ui/LightOrangeButton';

import Link from '../Link';

const PAPER_STATUS = ['제작중', '생성중', '완료', '생성 오류'];

const Container = styled.tbody`
  margin-top: 3.2rem;
`;

const TestPaper = styled.tr`
  width: 100%;
  height: 5.6rem;

  td {
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  column-gap: .8rem;
  justify-content: center;
`;

const EditButton = styled(WhiteButton)`
  width: 8.6rem;
  height: 3.2rem;
`;

const DownloadActiveButton = styled(OrangeButton)`
  width: 8.6rem;
  height: 3.2rem;

  a {
    color: #FFFFFF;
  }
`;

const DownloadDisabledButton = styled(LightOrangeButton)`
  width: 8.6rem;
  height: 3.2rem;
  cursor: pointer;
`;

const CopyButton = styled(OrangeButton)`
  width: 6rem;
  height: 3.2rem;
`;

const DeleteButton = styled(GrayButton)`
  width: 6rem;
  height: 3.2rem;
`;

type TableBodyDataProps = {
  papers: Paper[];
  onClickDelete: (id: number) => void;
}

export default function TableBodyData({
  papers, onClickDelete,
}: TableBodyDataProps) {
  const router = useRouter();

  const handleClickEdit = (id: number) => {
    router.push(`/papers/${id}/edit`);
  };

  const handleClickCopy = async (id: number) => {
    try {
      const copiedPaperId = await requestCopyPaper(id);

      router.push(`/papers/${copiedPaperId}/edit`);
    } catch (error) {
      // TODO: 에러처리
    }
  };

  return (
    <Container>
      {papers.map(({
        id, name, type, grade, school, updatedAt, status, downloadUri,
      }, index) => (
        <TestPaper key={id}>
          <td>
            {index + 1}
          </td>
          <td>
            {name}
          </td>
          <td>
            {type}
          </td>
          <td>
            {grade}
          </td>
          <td>
            {school}
          </td>
          <td>
            {toDate(updatedAt)}
          </td>
          <td>
            {PAPER_STATUS[Number(status)]}
          </td>
          <td>
            <ActionButtonWrapper>
              {PAPER_STATUS[Number(status)] === '제작중' && (
                <EditButton
                  type="button"
                  onClick={() => handleClickEdit(id)}
                >
                  편집하기
                </EditButton>
              )}
              {PAPER_STATUS[Number(status)] === '생성중' && (
                <DownloadDisabledButton
                  type="button"
                >
                  다운로드
                </DownloadDisabledButton>
              )}
              {PAPER_STATUS[Number(status)] === '완료' && (
                <DownloadActiveButton type="button">
                  <Link to={downloadUri || '/'}>
                    다운로드
                  </Link>
                </DownloadActiveButton>
              )}
              {PAPER_STATUS[Number(status)] === '생성 오류' && (
                <DownloadDisabledButton
                  type="button"
                >
                  다운로드
                </DownloadDisabledButton>
              )}
              <CopyButton
                type="button"
                onClick={() => handleClickCopy(id)}
              >
                복사
              </CopyButton>
              <DeleteButton
                type="button"
                onClick={() => onClickDelete(id)}
              >
                삭제
              </DeleteButton>
            </ActionButtonWrapper>
          </td>
        </TestPaper>
      ))}
    </Container>
  );
}
