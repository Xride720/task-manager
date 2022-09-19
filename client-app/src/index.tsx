import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import 'antd/dist/antd.dark.less';
import { ApolloProvider } from "@apollo/client";

import { client } from '@apollo-config';
import { antTheme } from '@styles/antThemeConfig';
ConfigProvider.config({
  theme: antTheme
})
const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </ApolloProvider>
);