import styled from 'styled-components';

const Field = styled.div`
  display: flex;  

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    display: block;
  }
`;

const Label = styled.label`
  display: flex;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3rem;
  letter-spacing: -0.96px;
  width: 17rem;
  margin-right: 4.8rem;
  align-items: center;  

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    font-size: 3.75vw;
    line-height: 1.25em;
    letter-spacing: -0.04em;
    margin-right: 0;
    margin-bottom: 1.25vw;
    width: auto;
  }
`;

const Input = styled.input`
  width: 402px;
  height: 56px;
  border-radius: .4rem;
  background: ${(props) => props.theme.colors.gray50};
  padding: 1.6rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    width: 85vw;
    aspect-ratio: 272 / 28;
    border-radius: 0.65vw;
    padding: 5vw;
  }
`;

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type?: 'text';
  placeholder ?: string;
  required?: boolean;
  onChange: ({ name, value }: {name: string, value:string}) => void;
}

export default function TextInputField({
  label, name, type = 'text', value, placeholder = '', required, onChange,
}: InputFieldProps) {
  const id = `input-${name}`;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onChange({
      name: target.name,
      value: target.value,
    });
  };

  return (
    <Field>
      <Label htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChangeInput}
      />
    </Field>
  );
}
