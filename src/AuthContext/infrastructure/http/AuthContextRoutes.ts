// src/AuthContext/infrastructure/http/auth.routes.ts
import type { Container } from 'inversify';
import type { Express } from 'express';
import {
  createRouter,
  RouteDefinition,
} from '#root/src/Shared/infrastructure/http/RouterFactory.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';

export const authRoutes: RouteDefinition[] = [
  {
    method: 'post',
    path: '/register',
    controller: TYPES.RegisterUserController,
  },
  {
    method: 'get',
    path: '/google',
    controller: TYPES.GoogleAuthController,
    action: 'login',
  },
  {
    method: 'get',
    path: '/google/callback',
    controller: TYPES.GoogleAuthController,
    action: 'callback',
  },
];

export function buildAuthRouter(app: Express, container: Container) {
  const router = createRouter(container, authRoutes);
  app.use('/api/auth', router);
}
