import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import './i18n'; // 在这里导入 i18n.js
import "toasted-notes/src/styles.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
