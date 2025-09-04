import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserEntity } from '#root/src/AuthContext/infrastructure/persistence/entities/User.entity.ts';
import { AppDataSource } from '#root/src/data-source.ts';

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async save(user: User): Promise<void> {
    const userEntity = UserEntity.fromDomain({
      id: user.id.value,
      email: user.email,
      password: user.password,
      googleId: user.googleId,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider as 'local' | 'google',
      tokenVersion: 1, // Default token version
    });

    await this.repository.save(userEntity);
  }

  async findById(id: UserId): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id: id.value }
    });

    if (!userEntity) {
      return null;
    }

    return new User(
      new UserId(userEntity.id),
      userEntity.email,
      userEntity.password,
      userEntity.googleId,
      userEntity.name,
      userEntity.avatar,
      userEntity.provider,
      userEntity.createdAt,
      userEntity.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email }
    });

    if (!userEntity) {
      return null;
    }

    return new User(
      new UserId(userEntity.id),
      userEntity.email,
      userEntity.password,
      userEntity.googleId,
      userEntity.name,
      userEntity.avatar,
      userEntity.provider,
      userEntity.createdAt,
      userEntity.updatedAt
    );
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { googleId }
    });

    if (!userEntity) {
      return null;
    }

    return new User(
      new UserId(userEntity.id),
      userEntity.email,
      userEntity.password,
      userEntity.googleId,
      userEntity.name,
      userEntity.avatar,
      userEntity.provider,
      userEntity.createdAt,
      userEntity.updatedAt
    );
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete({ id: id.value });
  }

  async exists(id: UserId): Promise<boolean> {
    const count = await this.repository.count({
      where: { id: id.value }
    });
    return count > 0;
  }
} 