import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 15rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
  height: 8.2rem;
  align-items: center;
`;

const TestPaperTitle = styled.input`
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: -0.56px;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray100};
  }
`;

const TestPaperInformation = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.64px;

  :last-child {
    margin-right: 0;
  } 
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.gray400};
  margin-right: .8rem;
`;

const Information = styled.span`
  margin-right: 1.6rem;

  :last-child {
    margin-right: 0;
  } 
`;

type SortProps = {
  name: string;
  type: string;
  grade: string;
  school: string;
  onChangeName: (paperName: string) => void;
}

export default function Sort({
  name, type, grade, school, onChangeName,
}: SortProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onChangeName(target.value);
  };

  return (
    <Container>
      <TestPaperTitle
        type="text"
        name="name"
        value={name}
        placeholder="시험지 제목"
        onChange={handleChange}
      />
      <TestPaperInformation>
        <Label>분류</Label>
        <Information>{type}</Information>
        <Label>학년</Label>
        <Information>{grade}</Information>
        {type === '내신' && (
          <>
            <Label>학교</Label>
            <Information>{school}</Information>
          </>
        )}
      </TestPaperInformation>
    </Container>
  );
}
