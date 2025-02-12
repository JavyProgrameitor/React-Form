import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Asegura que los paths de los assets sean correctos
  plugins: [react()],
});
