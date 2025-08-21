import { Router } from 'express';
import type { Container } from 'inversify';

export interface RouteDefinition {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  controller: symbol;
  action?: string;
}

export function createRouter(
  container: Container,
  routeDefinitions: RouteDefinition[]
): Router {
  const router = Router();

  routeDefinitions.forEach(
    ({ method, path, controller, action = 'execute' }) => {
      const controllerInstance = container.get(controller);
      router[method](path, async (req, res, next) => {
        try {
          console.log('--- Action ---', action);
          await controllerInstance[action](req, res, next);
        } catch (error) {
          next(error);
        }
      });
    }
  );

  return router;
}
