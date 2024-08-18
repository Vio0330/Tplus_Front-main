import styled from 'styled-components';

const Container = styled.tbody`
  tr td {
    text-align: center;
    height: 30.8rem;
    vertical-align: middle;
  }

  tr td:first-child {
    width: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function TableBodyEmpty() {
  return (
    <Container>
      <tr>
        <td colSpan={8}>
          생성된 파일이 없습니다. 새로 생성해주세요.
        </td>
      </tr>
    </Container>
  );
}
