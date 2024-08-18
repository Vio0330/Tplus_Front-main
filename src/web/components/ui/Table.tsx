import styled from 'styled-components';

const Table = styled.table`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
  width: 100%;

  thead {
    height: 7rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.gray400};
  }

  thead tr {
    display: flex;
    align-items: center;
    padding-inline: 15rem;
    min-width: 84rem;
    width: 100%;
    height: 7rem;
  }

  thead th {
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
  }

  tbody {
    display: block;
    padding-inline: 15rem;
    height: 69.4rem;
    overflow-y: auto;
  }

  tbody tr {
    display: flex;
    min-width: 84rem;
    width: 100%;
  }

  thead tr th:first-child {
    width: 3%;
  }

  tbody tr td:first-child {
    width: 3%;
  }

  thead tr th:nth-child(2) {
    width: 24%
  }

  tbody tr td:nth-child(2) {
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 24%
  }

  thead tr th:nth-child(3) {
    width: 6%;
  }

  tbody tr td:nth-child(3) {
    width: 6%;
  }

  thead tr th:nth-child(4) {
    width: 5%;
  }

  tbody tr td:nth-child(4) {
    width: 5%;
  }

  thead tr th:nth-child(5) {
    width: 15%;
  }

  tbody tr td:nth-child(5) {
    width: 15%;
  }

  thead tr th:nth-child(6) {
    width: 12%;
  }

  tbody tr td:nth-child(6) {
    width: 12%;
  }

  thead tr th:nth-child(7) {
    width: 7%;
  }

  tbody tr td:nth-child(7) {
    width: 7%;
  }

  thead tr th:nth-child(8) {
    width: 28%
  }

  tbody tr td:nth-child(8) {
    display: flex;
    justify-content: end;
    width: 28%
  }
`;

export default Table;
