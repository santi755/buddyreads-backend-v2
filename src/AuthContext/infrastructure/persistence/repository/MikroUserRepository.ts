import { injectable } from 'inversify';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User as DomainUser } from '#root/src/AuthContext/domain/user/User.ts';
import { User as MikroUser } from '#root/src/AuthContext/infrastructure/persistence/models/User.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';

@injectable()
export class MikroOrmUserRepository extends EntityRepository<MikroUser> implements UserRepository {
  
  private domainToMikroUser(domainUser: DomainUser): MikroUser {
    return new MikroUser({
      id: domainUser.id.value,
      email: domainUser.email,
      password: domainUser.password,
      googleId: domainUser.googleId,
      name: domainUser.name,
      avatar: domainUser.avatar,
      provider: domainUser.provider,
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt,
    });
  }

  private mikroUserToDomain(mikroUser: MikroUser): DomainUser {
    return DomainUser.create(
      UserId.fromString(mikroUser.id),
      mikroUser.email,
      mikroUser.password ?? null,
      mikroUser.googleId ?? null,
      mikroUser.name ?? null,
      mikroUser.avatar ?? null,
      mikroUser.provider,
      mikroUser.createdAt,
      mikroUser.updatedAt
    );
  }

  async save(user: DomainUser): Promise<void> {
    const mikroUser = this.domainToMikroUser(user);
    
    await this.em.persistAndFlush(mikroUser);
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const mikroUser = await this.findOne({ email });
    
    if (!mikroUser) {
      return null;
    }

    return this.mikroUserToDomain(mikroUser);
  }

  async findByGoogleId(googleId: string): Promise<DomainUser | null> {
    const mikroUser = await this.findOne({ googleId });
    
    if (!mikroUser) {
      return null;
    }

    return this.mikroUserToDomain(mikroUser);
  }
}