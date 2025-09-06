import { IdentityId } from '#root/src/AuthContext/domain/user/IdentityId.ts';
import { IdentityDatetime } from './IdentityDatetime';
import { IdentityEmail } from './IdentityEmail';
import { IdentityProvider } from './IdentityProvider';
import { UserId } from './UserId';

export class Identity {
  constructor(
    public readonly id: IdentityId,
    public readonly userId: UserId,
    public readonly email: IdentityEmail,
    public readonly provider: IdentityProvider,
    public readonly providerId: string,
    public readonly password: string | null,
    public readonly createdAt: IdentityDatetime,
    public readonly updatedAt: IdentityDatetime
  ) {
    this.id = id;
    this.userId = userId;
    this.email = email;
    this.provider = provider;
    this.providerId = providerId;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createFromGoogle(id: IdentityId, userId: UserId, email: IdentityEmail, provider: IdentityProvider, providerId: string): Identity {
    const createdAt = IdentityDatetime.now();
    const updatedAt = IdentityDatetime.now();
    return new Identity(id, userId, email, provider, providerId, null, createdAt, updatedAt);
  }

  static createFromLocal(id: IdentityId, userId: UserId, email: IdentityEmail, provider: IdentityProvider, providerId: string, password: string): Identity {
    const createdAt = IdentityDatetime.now();
    const updatedAt = IdentityDatetime.now();
    return new Identity(id, userId, email, provider, providerId, password, createdAt, updatedAt);
  }
}