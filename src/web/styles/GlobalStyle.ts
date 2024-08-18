import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    font-family: 'Pretendard Variable';
  }

  body {
    position: relative;
    font-size: 1.6rem;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.gray800};
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
  }

  a {
    text-decoration: none;
  }

  input {
    border: 0;
  }

  hr {
    margin: 0;
    border: 0;
    padding: 0;
  }

  :lang(ko) {
    h1, h2, h3 {
      word-break: keep-all;
    }
  }

  input {
    border: 0;
  }

  input:focus {
    outline: none;
  }
`;

export default GlobalStyle;
