import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserDatetime } from '#root/src/AuthContext/domain/user/UserDatetime.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';

export const USER_PROVIDER = {
  LOCAL: 'local',
  GOOGLE: 'google',
};

export class User {
  public readonly id: UserId;
  public readonly email: UserEmail;
  public readonly password: string | null;
  public readonly googleId: string | null;
  public readonly name: string | null;
  public readonly avatar: string | null;
  public readonly provider: string;
  public readonly createdAt: UserDatetime;
  public readonly updatedAt: UserDatetime;

  constructor(
    id: UserId,
    email: UserEmail,
    password: string | null,
    googleId: string | null,
    name: string | null,
    avatar: string | null,
    provider: string,
    createdAt: UserDatetime,
    updatedAt: UserDatetime
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.googleId = googleId;
    this.name = name;
    this.avatar = avatar;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(    
    id: UserId,
    email: UserEmail,
    password: string | null,
    googleId: string | null,
    name: string | null,
    avatar: string | null,
    provider: string,): User {
    const createdAt = UserDatetime.now();
    const updatedAt = UserDatetime.now();
    return new User(id, email, password, googleId, name, avatar, provider, createdAt, updatedAt);
  }

  static register(id: UserId, email: UserEmail, password: string): User {
    const createdAt = UserDatetime.now();
    const updatedAt = UserDatetime.now();
    return new User(
      id,
      email,
      password,
      null,
      null,
      null,
      USER_PROVIDER.LOCAL,
      createdAt,
      updatedAt
    );
  }

  static createFromGoogle(
    id: UserId,
    email: UserEmail,
    googleId: string,
    name: string,
    avatar: string
  ): User {
    const createdAt = UserDatetime.now();
    const updatedAt = UserDatetime.now();
    return new User(
      id,
      email,
      null,
      googleId,
      name,
      avatar,
      USER_PROVIDER.GOOGLE,
      createdAt,
      updatedAt
    );
  }
}
