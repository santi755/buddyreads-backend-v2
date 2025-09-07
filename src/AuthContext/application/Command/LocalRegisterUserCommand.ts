import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';

export class LocalRegisterUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(
    id: string,
    email: string,
    password: string
  ): LocalRegisterUserCommand {
    return new LocalRegisterUserCommand(id, email, password);
  }

  getUserId(): UserId {
    return UserId.fromString(this.id);
  }

  getUserEmail(): UserEmail {
    return UserEmail.generate(this.email);
  }
}
