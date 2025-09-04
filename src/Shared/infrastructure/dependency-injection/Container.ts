import { Container } from 'inversify';
import { createMongoConnection } from '#root/src/Shared/infrastructure/persistence/mongodb/MongoClientFactory.ts';
import { createTypeOrmConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/TypeOrmClientFactory.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { bindAuthContextContext } from '#root/src/AuthContext/infrastructure/dependency-injection/AuthContextContainer.ts';
import { WinstonLogger } from '#root/src/Shared/infrastructure/logger/winston/WinstonLogger.ts';

export async function createAppContainer() {
  try {
    const container = new Container();

    // MongoDB para proyecciones y vistas optimizadas
    const db = await createMongoConnection();
    container.bind(TYPES.Database).toConstantValue(db);

    // TypeORM como repositorio principal
    const typeormConnection = await createTypeOrmConnection();
    container.bind(TYPES.TypeOrmConnection).toConstantValue(typeormConnection);

    const logger = new WinstonLogger();
    container.bind(TYPES.Logger).toConstantValue(logger); 

    bindAuthContextContext(container);

    return container;
  } catch (error) {
    console.error('Error al crear el contenedor de dependencias:', error);
    throw error;
  }
}
