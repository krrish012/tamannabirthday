import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'photos-server-plugin',
        configureServer(server) {
          // 1. Direct Static Server for uploaded photos in public directory
          server.middlewares.use((req, res, next) => {
            const urlPath = req.url?.split('?')[0] || '';
            const match = urlPath.match(/^\/(?:(\d+\.(?:jpg|jpeg|png))|(hbdt\.(?:m4a|mp3|wav)))$/i);
            if (match) {
              const filename = match[1] || match[2];
              const publicDir = path.resolve(__dirname, 'public');
              const filePath = path.join(publicDir, filename);

              if (fs.existsSync(filePath)) {
                try {
                  const fileBuffer = fs.readFileSync(filePath);
                  res.statusCode = 200;
                  let contentType = 'image/jpeg';
                  if (filename.endsWith('.png')) contentType = 'image/png';
                  else if (filename.endsWith('.m4a')) contentType = 'audio/mp4';
                  else if (filename.endsWith('.mp3')) contentType = 'audio/mpeg';
                  else if (filename.endsWith('.wav')) contentType = 'audio/wav';
                  res.setHeader('Content-Type', contentType);
                  res.setHeader('Content-Length', fileBuffer.length);
                  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                  return res.end(fileBuffer);
                } catch {
                  // Fallback
                }
              }
            }
            next();
          });

          // 2. API to list permanently loaded photos on server
          server.middlewares.use('/api/list-photos', (req, res) => {
            if (req.method === 'GET') {
              const publicDir = path.resolve(__dirname, 'public');
              const available: Record<string, string> = {};
              if (fs.existsSync(publicDir)) {
                for (let i = 1; i <= 14; i++) {
                  const filename = `${i}.jpg`;
                  if (fs.existsSync(path.join(publicDir, filename))) {
                    available[i] = `/${filename}`;
                  }
                }
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ photos: available }));
            } else {
              res.statusCode = 404;
              res.end();
            }
          });

          // 3. API to save photo permanently to public directory
          server.middlewares.use('/api/save-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { filename, base64 } = JSON.parse(body);
                  const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
                  const buffer = Buffer.from(cleanBase64, 'base64');
                  const publicDir = path.resolve(__dirname, 'public');
                  if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                  }
                  fs.writeFileSync(path.join(publicDir, filename), buffer);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, file: filename, url: `/${filename}` }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
            } else {
              res.statusCode = 404;
              res.end();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
