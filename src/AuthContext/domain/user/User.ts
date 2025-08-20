import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';

export class User {
  public readonly id: UserId;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: UserId,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(id: UserId, email: string, password: string): User {
    return new User(id, email, password, new Date(), new Date());
  }
}
