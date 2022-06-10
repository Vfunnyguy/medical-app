import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/index.scss';
import './styles/custom-mui.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}> */}
        <App />
      {/* </Provider>
    </PersistGate> */}
  </React.StrictMode>
);
