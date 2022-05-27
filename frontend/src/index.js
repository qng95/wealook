import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import {CssBaseline, ThemeProvider} from "@mui/material";

import App from './App';
import { store } from './stores/store';
import theme from "./whitelabel/themes/theme";

import './index.css';

/**/

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);