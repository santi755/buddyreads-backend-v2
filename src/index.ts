import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { env } from '#root/config/env.ts';
import type { Request, Response } from 'express';
import { createAppContainer } from '#root/src/Shared/infrastructure/dependency-injection/Container.ts';
import { buildAuthRouter } from '#root/src/AuthContext/infrastructure/http/AuthContextRoutes.ts';
import { errorHandler } from '#root/src/Shared/application/ErrorHandler.ts';
import { configureGoogleStrategy } from '#root/src/AuthContext/infrastructure/passport/PassportConfig.ts';
import { createErrorLoggingMiddleware } from '#root/src/Shared/infrastructure/logger/winston/ErrorLogginMiddleware.ts';
import { RequestContextMiddleware } from '#root/src/Shared/infrastructure/http/middleware/RequestContextMiddleware.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';

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
    const port = env.PORT || 8080;

    // 1. Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 2. Session middleware
    app.use(
      session({
        secret: env.SESSION_SECRET || 'your-session-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
        },
      })
    );

    // 3. Passport configuration
    app.use(passport.initialize());
    app.use(passport.session());

    // 4. Create container and strategies
    const container = await createAppContainer();
    configureGoogleStrategy(container);

    // 5. Request context middleware
    const requestContextMiddleware = container.get<RequestContextMiddleware>(TYPES.RequestContextMiddleware);
    app.use(requestContextMiddleware.extractContext);

    // 6. Routes
    buildAuthRouter(app, container);

    app.get('/health', (_req: Request, res: Response) => {
      res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    });

    //app.use(createErrorLoggingMiddleware(container) as any);
    //app.use(errorHandler);

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
