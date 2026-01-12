import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Esta es la configuración que soluciona el error "React is not defined"
export default defineConfig({
  plugins: [react()],
})
