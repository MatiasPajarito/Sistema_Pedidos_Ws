/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'  <-- COMENTA ESTA LÍNEA (ponle // al principio)
import DemoCaburguau from './DemoCaburguau' // <-- AGREGA ESTA LÍNEA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App />  <-- COMENTA ESTA */}
    <DemoCaburguau /> {/* <-- AGREGA ESTA */}
  </React.StrictMode>,
)
