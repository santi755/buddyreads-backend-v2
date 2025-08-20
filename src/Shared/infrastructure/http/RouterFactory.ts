import { Router } from 'express';
import type { Container } from 'inversify';

export interface RouteDefinition {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  controller: symbol;
}

export function createRouter(
  container: Container,
  routeDefinitions: RouteDefinition[]
): Router {
  const router = Router();

  routeDefinitions.forEach(({ method, path, controller }) => {
    const controllerInstance = container.get(controller);
    router[method](path, async (req, res, next) => {
      try {
        await controllerInstance.execute(req, res, next);
      } catch (error) {
        next(error);
      }
    });
  });

  return router;
}
