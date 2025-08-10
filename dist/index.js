import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
const port = process.env['PORT'] || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
  res.json({
    message: '¡BuddyReads Backend v2 funcionando correctamente!',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
  });
});
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en el puerto ${port}`);
  console.log(`📊 Health check disponible en: http://localhost:${port}/health`);
});
//# sourceMappingURL=index.js.map
