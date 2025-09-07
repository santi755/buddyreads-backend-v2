import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserDatetime } from '#root/src/AuthContext/domain/user/UserDatetime.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';
import { Identity } from '#root/src/AuthContext/domain/identity/Identity';

export class User { 
  constructor(
    public readonly id: UserId,
    public readonly name: string | null,
    public readonly avatar: string | null,
    public readonly primaryEmail: UserEmail,
    public readonly identities: Identity[],
    public readonly isActive: boolean,
    public readonly isEmailVerified: boolean,
    public readonly lastLoginAt: UserDatetime | null,
    public readonly createdAt: UserDatetime,
    public readonly updatedAt: UserDatetime,
  ) {}

  static create(    
    id: UserId,
    name: string | null,
    avatar: string | null,
    primaryEmail: UserEmail,
    identities: Identity[],
    isActive: boolean,
    isEmailVerified: boolean,
    lastLoginAt: UserDatetime | null,
    createdAt: UserDatetime,
    updatedAt: UserDatetime,
  ): User {
    return new User(
      id, 
      name, 
      avatar, 
      primaryEmail, 
      identities, 
      isActive,
      isEmailVerified,
      lastLoginAt,
      createdAt,
      updatedAt
    );
  }

  // Métodos de negocio
  verifyEmail(): User {
    return new User(
      this.id,
      this.name,
      this.avatar,
      this.primaryEmail,
      this.identities,
      this.isActive,
      true, // isEmailVerified = true
      this.lastLoginAt,
      this.createdAt,
      UserDatetime.now() // updatedAt
    );
  }

  deactivate(): User {
    return new User(
      this.id,
      this.name,
      this.avatar,
      this.primaryEmail,
      this.identities,
      false, // isActive = false
      this.isEmailVerified,
      this.lastLoginAt,
      this.createdAt,
      UserDatetime.now() // updatedAt
    );
  }

  updateLastLogin(): User {
    return new User(
      this.id,
      this.name,
      this.avatar,
      this.primaryEmail,
      this.identities,
      this.isActive,
      this.isEmailVerified,
      UserDatetime.now(), // lastLoginAt
      this.createdAt,
      UserDatetime.now() // updatedAt
    );
  }
}
