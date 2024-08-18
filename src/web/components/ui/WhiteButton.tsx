import styled from 'styled-components';

const WhiteButton = styled.button`
  display: flex;
  padding-inline: 1.6rem;
  justify-content: center;
  align-items: center;
  border-radius: .4rem;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.orange100};
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.64px;
  border: 1px solid ${(props) => props.theme.colors.orange100};
`;

export default WhiteButton;
