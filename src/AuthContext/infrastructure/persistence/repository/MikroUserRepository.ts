import { injectable, inject } from 'inversify';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User as DomainUser } from '#root/src/AuthContext/domain/user/User.ts';
import { UserEntity } from '#root/src/AuthContext/infrastructure/persistence/entities/User.entity.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { MikroORM } from '@mikro-orm/core';
import { UserIdAlreadyExistsError } from '#root/src/AuthContext/application/errors/UserIdAlreadyExistsError.ts';

@injectable()
export class MikroOrmUserRepository implements UserRepository {
  constructor(
    @inject(TYPES.PostgresConnection)
    private readonly orm: MikroORM
  ) {}

  private domainToMikroUser(domainUser: DomainUser): UserEntity {
    const entity = new UserEntity();

    entity.id = domainUser.id.value;
    entity.email = domainUser.email;
    entity.password = domainUser.password;
    entity.googleId = domainUser.googleId;
    entity.name = domainUser.name;
    entity.avatar = domainUser.avatar;
    entity.provider = domainUser.provider;
    entity.createdAt = domainUser.createdAt;
    entity.updatedAt = domainUser.updatedAt;

    return entity;
  }

  private mikroUserToDomain(mikroUser: UserEntity): DomainUser {
    return new DomainUser(
      UserId.fromString(mikroUser.id),
      mikroUser.email,
      mikroUser.password ?? null,
      mikroUser.googleId ?? null,
      mikroUser.name ?? null,
      mikroUser.avatar ?? null,
      mikroUser.provider,
      mikroUser.tokenVersion,
      mikroUser.createdAt,
      mikroUser.updatedAt
    );
  }

  async save(user: DomainUser): Promise<void> {
    const em = this.orm.em.fork();

    try {
      const mikroUser = this.domainToMikroUser(user);
      await em.persistAndFlush(mikroUser);
    } catch (error: any) {
      // PostgreSQL unique constraint violation
      if (error.code === '23505') {
        if (error.constraint === 'users_pkey') {
          throw new UserIdAlreadyExistsError({ userId: user.id.value });
        }
        // Email unique constraint se maneja en la capa de aplicación
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const em = this.orm.em.fork();
    const mikroUser = await em.findOne(UserEntity, { email });

    if (!mikroUser) {
      return null;
    }

    return this.mikroUserToDomain(mikroUser);
  }

  async findByGoogleId(googleId: string): Promise<DomainUser | null> {
    const em = this.orm.em.fork();
    const mikroUser = await em.findOne(UserEntity, { googleId });

    if (!mikroUser) {
      return null;
    }

    return this.mikroUserToDomain(mikroUser);
  }

  async findById(id: UserId): Promise<DomainUser | null> {
    const em = this.orm.em.fork();
    const mikroUser = await em.findOne(UserEntity, { id: id.value });

    if (!mikroUser) {
      return null;
    }

    return this.mikroUserToDomain(mikroUser);
  }

  async incrementTokenVersion(userId: UserId): Promise<number> {
    const em = this.orm.em.fork();
    const userEntity = await em.findOne(UserEntity, { id: userId.value });

    if (!userEntity) {
      throw new Error('User not found');
    }

    userEntity.tokenVersion += 1;
    userEntity.updatedAt = new Date();
    await em.persistAndFlush(userEntity);

    return userEntity.tokenVersion;
  }
}
