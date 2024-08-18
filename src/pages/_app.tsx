/* eslint-disable react/jsx-props-no-spreading */

import { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import { Provider } from 'react-redux';

import Head from 'next/head';
import store from '../web/redux/store';

import GlobalStyle from '../web/styles/GlobalStyle';
import DefaultTheme from '../web/styles/defaultTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>선생님께 플러스! 티플</title>
      </Head>
      <ThemeProvider theme={DefaultTheme}>
        <Reset />
        <GlobalStyle />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>

  );
}
