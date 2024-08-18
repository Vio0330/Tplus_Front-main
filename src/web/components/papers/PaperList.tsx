import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Paper } from '../../types';

import { deletePaper } from '../../services/apiService';

import TableContainer from '../ui/TableConatiner';
import Table from '../ui/Table';

import TableBodyData from './TableBodyData';
import TableBodyEmpty from './TableBodyEmpty';
import NotificationModal from '../NotificationModal';

type PaperListProps = {
  papers: Paper[];
}

const TABLE_HEADERS = ['순번', '제목', '분류', '학년', '학교', '마지막 편집일', '상태', '액션'];

export default function PaperList({ papers }: PaperListProps) {
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState(0);

  useEffect(() => {
    setShowDeleteModal(false);
    setSelectedPaperId(0);
  }, []);

  const handleClickDelete = (id: number) => {
    setSelectedPaperId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleClickDeleteOk = async () => {
    try {
      const isDeleted = await deletePaper(selectedPaperId);

      if (isDeleted) {
        router.reload();
      }
    } catch (error) {
      // TODO: 에러처리
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {TABLE_HEADERS.map((title) => (
              <th key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        {(papers || []).length > 0 ? (
          <TableBodyData
            papers={papers}
            onClickDelete={handleClickDelete}
          />
        ) : (
          <TableBodyEmpty />
        )}
      </Table>
      <NotificationModal
        show={showDeleteModal}
        title="시험지 삭제하기"
        message="삭제하시겠습니까?"
        onClose={handleCloseDeleteModal}
        onClickOk={handleClickDeleteOk}
      />
    </TableContainer>
  );
}
