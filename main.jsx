import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoCaburguau from './DemoCaburguau.jsx'

// Elimina la línea de "import './index.css'" si no tienes ese archivo en GitHub
// ya que causará otro error de carga.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoCaburguau />
  </React.StrictMode>,
)
