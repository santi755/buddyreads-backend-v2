import { AppDataSource } from '#root/src/data-source.ts';

export async function createTypeOrmConnection() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ TypeORM connection established successfully');
    }
    return AppDataSource;
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL with TypeORM:', error);
    throw error;
  }
} 