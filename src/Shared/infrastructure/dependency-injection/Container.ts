import { Container } from 'inversify';
import { createMongoConnection } from '#root/src/Shared/infrastructure/persistence/mongodb/MongoClientFactory.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { bindAuthContextContext } from '#root/src/AuthContext/infrastructure/dependency-injection/AuthContextContainer.ts';

export async function createAppContainer() {
  try {
    const container = new Container();

    const db = await createMongoConnection();
    container.bind(TYPES.Database).toConstantValue(db);

    bindAuthContextContext(container);

    return container;
  } catch (error) {
    console.error('Error al crear el contenedor de dependencias:', error);
    throw error;
  }
}
