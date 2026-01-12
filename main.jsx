import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoCaburguau from './DemoCaburguau.jsx' // Importación local directa
import './index.css' // Si no tienes index.css, puedes borrar esta línea para evitar más errores

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoCaburguau />
  </React.StrictMode>,
)
