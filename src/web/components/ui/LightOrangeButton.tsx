import styled from 'styled-components';

const LightOrangeButton = styled.button`
  display: flex;
  padding-inline: 1.6rem;
  justify-content: center;
  align-items: center;
  border-radius: .4rem;
  background: ${(props) => props.theme.colors.orange40};
  color: ${(props) => props.theme.colors.white};
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.64px;
  cursor: default;
`;

export default LightOrangeButton;
