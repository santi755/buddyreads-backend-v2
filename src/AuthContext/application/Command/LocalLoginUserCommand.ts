import { UserEmail } from "#root/src/AuthContext/domain/user/UserEmail.ts";

export class LocalLoginUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(
    email: string,
    password: string
  ): LocalLoginUserCommand {
    return new LocalLoginUserCommand(email, password);
  }

  getUserEmail(): UserEmail {
    return UserEmail.generate(this.email);
  }

  getPassword(): string {
    return this.password;
  }
}