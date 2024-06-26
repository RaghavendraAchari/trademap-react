import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"



// https://vitejs.dev/config/
export default defineConfig(({mode})=> {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.CLIENT_ID': JSON.stringify(env.CLIENT_ID)
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
  
})
