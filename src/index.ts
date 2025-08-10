import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';

// Configurar variables de entorno
dotenv.config();

const app = express();
const port: string | number = process.env['PORT'] || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '¡BuddyReads Backend v2 funcionando correctamente con Juli!',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
  });
});

// Ruta de health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en el puerto ${port}`);
  console.log(`📊 Health check disponible en: http://localhost:${port}/health`);
});
