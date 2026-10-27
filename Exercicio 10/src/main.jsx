import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importação do Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Importação do Bootstrap JS Bundle (caso utilize modais, tooltips, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)