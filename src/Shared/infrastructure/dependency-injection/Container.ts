import { Container } from 'inversify';
import { createMongoConnection } from '#root/src/Shared/infrastructure/persistence/mongodb/MongoClientFactory.ts';
import { createPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { bindAuthContextContext } from '#root/src/AuthContext/infrastructure/dependency-injection/AuthContextContainer.ts';
import { WinstonLogger } from '#root/src/Shared/infrastructure/logger/winston/WinstonLogger.ts';
import { RequestContextService } from '#root/src/Shared/domain/services/RequestContextService.ts';
import { RequestContextMiddleware } from '#root/src/Shared/infrastructure/http/middleware/RequestContextMiddleware.ts';

export async function createAppContainer() {
  try {
    const container = new Container();

    // MongoDB para proyecciones y vistas optimizadas
    const db = await createMongoConnection();
    container.bind(TYPES.Database).toConstantValue(db);

    // Postgres como repositorio principal
    const postgresConnection = createPostgresConnection();
    container.bind(TYPES.PostgresConnection).toConstantValue(postgresConnection); 

    const logger = new WinstonLogger();
    container.bind(TYPES.Logger).toConstantValue(logger); 

    container.bind(TYPES.RequestContextService).to(RequestContextService);
    container.bind(TYPES.RequestContextMiddleware).to(RequestContextMiddleware);

    // Other contexts dependencies
    bindAuthContextContext(container);

    return container;
  } catch (error) {
    console.error('Error al crear el contenedor de dependencias:', error);
    throw error;
  }
}
