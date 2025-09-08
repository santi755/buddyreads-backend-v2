import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { LocalLoginUserCommand } from '#root/src/AuthContext/application/Command/LocalLoginUserCommand.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository.ts';
import { IdentityNotFoundError } from '#root/src/AuthContext/application/errors/IdentityNotFoundError.ts';
import { PasswordHasher } from '#root/src/AuthContext/domain/services/PasswordHasher.ts';
import { PasswordNotValidError } from '#root/src/AuthContext/application/errors/PasswordNotValidError.ts'
import { UserNotFoundError } from '#root/src/AuthContext/application/errors/UserNotFoundError.ts';
import { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User.ts';
import { RefreshTokenRepository } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenRepository.ts';

@injectable()
export class LocalLoginUserCommandHandler {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IdentityRepository,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async handle(command: LocalLoginUserCommand): Promise<User> {
    const identity = await this.identityRepository.findByEmail(command.getUserEmail());

    // TODO: handle password not set (Just local users have password)
    if (!identity || identity.password === null) {
      throw new IdentityNotFoundError({
        email: command.getUserEmail().value,
      });
    }

    await this.checkPassword(command.getPassword(), identity.password);

    identity.updateLastUsed();
    await this.identityRepository.update(identity);

    const user = await this.userRepository.findById(identity.userId.value);
    if (!user) {
      throw new UserNotFoundError(identity.userId.value);
    }

    this.createRefreshToken(user);
  }

  private async checkPassword(password: string, hash: string): Promise<void> {
    const isPasswordValid = await this.passwordHasher.verify(password, hash);
    if (!isPasswordValid) {
      throw new PasswordNotValidError({
        email: password,
      });
    }
  }

  private async createRefreshToken(user: User): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.create(user.id.value);
    await this.refreshTokenRepository.save(refreshToken);

    return refreshToken;
  }
}