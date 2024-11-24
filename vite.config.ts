import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'update-data',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/update-data' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            
            req.on('end', async () => {
              try {
                const filePath = path.resolve(__dirname, 'src/data/index.ts');
                await fs.writeFile(filePath, body);
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: (error as Error).message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
