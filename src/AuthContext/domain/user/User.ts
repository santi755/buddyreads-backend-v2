import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';

export class User {
  public readonly id: UserId;
  public readonly email: string;
  public readonly password: string | null;
  public readonly googleId: string | null;
  public readonly name: string | null;
  public readonly avatar: string | null;
  public readonly provider: 'local' | 'google';
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: UserId,
    email: string,
    password: string | null,
    googleId: string | null,
    name: string | null,
    avatar: string | null,
    provider: 'local' | 'google',
    createdAt: Date,
    updatedAt: Date
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

  static create(id: UserId, email: string, password: string): User {
    return new User(
      id,
      email,
      password,
      null,
      null,
      null,
      'local',
      new Date(),
      new Date()
    );
  }

  static createFromGoogle(
    id: UserId,
    email: string,
    googleId: string,
    name: string,
    avatar: string
  ): User {
    return new User(
      id,
      email,
      null,
      googleId,
      name,
      avatar,
      'google',
      new Date(),
      new Date()
    );
  }
}
