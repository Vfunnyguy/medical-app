import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider}from 'react-query'
import './styles/index.scss';
import './styles/custom-mui.css';
import {store}from '././redux/store'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      {/* <PersistGate loading={null} persistor={persistor}>
    </PersistGate> */}
    </React.StrictMode>
  </Provider>
);
