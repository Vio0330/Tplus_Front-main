import styled from 'styled-components';
import { Credit } from '../../types';
import TextInputField from './TextInputField';

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  margin-top: 3.2rem;
  row-gap: 2.4rem; 
`;

type FieldsProps = {
  form: Credit;
  onChangeField: ({ name, value }: {name: string; value: string}) => void;
}

export default function Fields({
  form, onChangeField,
}: FieldsProps) {
  const {
    school, grade, year, email,
  } = form;

  return (
    <Container>
      <TextInputField
        label="학교 이름"
        name="school"
        value={school}
        required
        onChange={onChangeField}
      />
      <TextInputField
        label="학년"
        name="grade"
        value={grade}
        required
        onChange={onChangeField}
      />
      <TextInputField
        label="시험 연도"
        name="year"
        value={year}
        required
        onChange={onChangeField}
      />
      <TextInputField
        label="가입한 이메일 제출"
        name="email"
        value={email}
        required
        onChange={onChangeField}
      />
    </Container>
  );
}
