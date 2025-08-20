import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import { createAppContainer } from '#root/src/Shared/infrastructure/dependency-injection/Container.ts';
import { buildAuthRouter } from '#root/src/AuthContext/infrastructure/http/AuthContextRoutes.ts';
import { errorHandler } from '#root/src/Shared/application/ErrorHandler.ts';

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

async function startServer() {
  try {
    dotenv.config();

    const app = express();
    const port = process.env['PORT'] || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const container = await createAppContainer();
    buildAuthRouter(app, container);

    app.get('/health', (_req: Request, res: Response) => {
      res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    });

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`🚀 Servidor funcionando en el puerto ${port}`);
      console.log(
        `📊 Health check disponible en: http://localhost:${port}/health`
      );
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();
