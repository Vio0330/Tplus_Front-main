/* eslint-disable import/prefer-default-export */

// eslint-disable-next-line import/no-extraneous-dependencies
import { render as originalRender } from '@testing-library/react';

import React from 'react';

import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';

import defaultTheme from '../styles/defaultTheme';

import store from '../redux/store';

export function render(element: React.ReactElement) {
  return originalRender((
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        {element}
      </ThemeProvider>
    </Provider>
  ));
}
