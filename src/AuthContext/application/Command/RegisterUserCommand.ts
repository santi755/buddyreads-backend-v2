import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';

export class RegisterUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(
    id: string,
    email: string,
    password: string
  ): RegisterUserCommand {
    return new RegisterUserCommand(id, email, password);
  }

  getUserId(): UserId {
    return UserId.fromString(this.id);
  }

  getUserEmail(): UserEmail {
    return UserEmail.generate(this.email);
  }
}
