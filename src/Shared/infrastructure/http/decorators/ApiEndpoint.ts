import { z, type ZodSchema } from 'zod';
import type { NextFunction, Request, Response } from 'express';

export interface ApiEndpointOptions<TBody> {
  bodySchema?: ZodSchema<TBody>;
  successStatus?: number;
}

export function ApiEndpoint<TBody = any>(
  options: ApiEndpointOptions<TBody> = {}
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        let validatedBody: TBody | undefined;

        if (options.bodySchema) {
          // Si req.body es undefined o null, usar un objeto vacío para que Zod valide los campos requeridos
          const bodyToValidate = req.body || {};
          const parseResult = options.bodySchema.safeParse(bodyToValidate);

          if (!parseResult.success) {
            console.error('Validation failed:', parseResult.error);

            // Usar 'issues' que es la propiedad correcta en Zod
            const errors = parseResult.error.issues.map((err) => ({
              field: err.path.length > 0 ? err.path.join('.') : 'root',
              message: err.message,
            }));

            return res.status(400).json({
              success: false,
              message: 'Validation failed',
              errors,
            });
          }

          validatedBody = parseResult.data;
        }

        const result = await originalMethod.call(
          this,
          validatedBody || req.body,
          req,
          res
        );

        if (!res.headersSent && result && typeof result === 'object') {
          res.status(options.successStatus || 200).json(result);
        }
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}
