import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import './styles/index.scss'
import './styles/custom-mui.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <App />
{/* <Provider store={store}>
</Provider> */}
  
  </React.StrictMode>
)
