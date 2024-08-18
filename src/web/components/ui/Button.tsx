import styled from 'styled-components';

const Button = styled.button`
  font-size: 2rem;
  font-weight: 600;
  line-height: 3.2rem;
  letter-spacing: -0.8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: .8rem 4rem;
  border-radius: .4rem;
  background: ${(props) => props.theme.colors.orange100};
  color: ${(props) => props.theme.colors.white};
`;

export default Button;
