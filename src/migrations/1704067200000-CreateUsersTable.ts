import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateUsersTable1704067200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'google_id',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'provider',
            type: 'enum',
            enum: ['local', 'google'],
            default: "'local'",
            isNullable: false,
          },
          {
            name: 'token_version',
            type: 'int',
            default: 1,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true
    );

    // Crear índices
    await queryRunner.createIndex(
      'users',
      new Index({
        name: 'IDX_USERS_EMAIL',
        columnNames: ['email'],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      'users',
      new Index({
        name: 'IDX_USERS_GOOGLE_ID',
        columnNames: ['google_id'],
      })
    );

    await queryRunner.createIndex(
      'users',
      new Index({
        name: 'IDX_USERS_PROVIDER',
        columnNames: ['provider'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USERS_PROVIDER');
    await queryRunner.dropIndex('users', 'IDX_USERS_GOOGLE_ID');
    await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
    await queryRunner.dropTable('users');
  }
} 