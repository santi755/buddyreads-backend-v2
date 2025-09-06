import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserDatetime } from '#root/src/AuthContext/domain/user/UserDatetime.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';

export class User { 
  constructor(
    public readonly id: UserId,
    public readonly name: string | null,
    public readonly avatar: string | null,
    public readonly primaryEmail: UserEmail,
    public readonly createdAt: UserDatetime,
    public readonly updatedAt: UserDatetime,
  ) {
  }

  static create(    
    id: UserId,
    name: string | null,
    avatar: string | null,
    primaryEmail: UserEmail,
    createdAt: UserDatetime,
    updatedAt: UserDatetime,
  ): User {
    return new User(id, name, avatar, primaryEmail, createdAt, updatedAt);
  }
}
