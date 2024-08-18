import styled from 'styled-components';

const Container = styled.div`
  padding-top: ${(props) => props.theme.sizes.headerHeight};
  max-width: ${(props) => props.theme.sizes.maxWidth};
  min-width: ${(props) => props.theme.sizes.minWidth};
  min-height: 100vh;
  overflow: hidden;
  margin: 0 auto;
`;

export default Container;
