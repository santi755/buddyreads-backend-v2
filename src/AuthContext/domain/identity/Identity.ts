import { IdentityId } from '#root/src/AuthContext/domain/identity/IdentityId';
import { IdentityDatetime } from './IdentityDatetime';
import { IdentityEmail } from './IdentityEmail';
import { IdentityProvider } from './IdentityProvider';
import { UserId } from '../user/UserId';

export class Identity {
  constructor(
    public readonly id: IdentityId,
    public readonly userId: UserId,
    public readonly email: IdentityEmail,
    public readonly provider: IdentityProvider,
    public readonly providerId: string | null,
    public readonly password: string | null,
    public readonly isVerified: boolean,
    public readonly isPrimary: boolean,
    public readonly lastUsedAt: IdentityDatetime | null,
    public readonly createdAt: IdentityDatetime,
    public readonly updatedAt: IdentityDatetime
  ) {}

  static createFromGoogle(
    id: IdentityId, 
    userId: UserId, 
    email: IdentityEmail, 
    provider: IdentityProvider, 
    providerId: string
  ): Identity {
    const now = IdentityDatetime.now();
    return new Identity(
      id, 
      userId, 
      email, 
      provider, 
      providerId, 
      null, 
      true, 
      false,  
      null,  
      now, 
      now
    );
  }

  static createFromLocal(
    id: IdentityId, 
    userId: UserId, 
    email: IdentityEmail, 
    password: string
  ): Identity {
    const now = IdentityDatetime.now();
    const provider = IdentityProvider.createLocal();
    return new Identity(
      id, 
      userId, 
      email, 
      provider, 
      null,  
      password, 
      false,  
      false,  
      null,  
      now, 
      now
    );
  }

  verify(): Identity {
    return new Identity(
      this.id,
      this.userId,
      this.email,
      this.provider,
      this.providerId,
      this.password,
      true, 
      this.isPrimary,
      this.lastUsedAt,
      this.createdAt,
      IdentityDatetime.now()  
    );
  }

  setAsPrimary(): Identity {
    return new Identity(
      this.id,
      this.userId,
      this.email,
      this.provider,
      this.providerId,
      this.password,
      this.isVerified,
      true,  
      this.lastUsedAt,
      this.createdAt,
      IdentityDatetime.now()
    );
  }

  updateLastUsed(): Identity {
    return new Identity(
      this.id,
      this.userId,
      this.email,
      this.provider,
      this.providerId,
      this.password,
      this.isVerified,
      this.isPrimary,
      IdentityDatetime.now(), 
      this.createdAt,
      IdentityDatetime.now() 
    );
  }

  updatePassword(newPassword: string): Identity {
    return new Identity(
      this.id,
      this.userId,
      this.email,
      this.provider,
      this.providerId,
      newPassword,
      this.isVerified,
      this.isPrimary,
      this.lastUsedAt,
      this.createdAt,
      IdentityDatetime.now()
    );
  }
}