import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { TYPES as SharedTypes } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { LocalLoginUserCommand } from '#root/src/AuthContext/application/Command/LocalLoginUserCommand.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository.ts';
import { IdentityNotFoundError } from '#root/src/AuthContext/application/errors/IdentityNotFoundError.ts';
import { PasswordHasher } from '#root/src/AuthContext/domain/services/PasswordHasher.ts';
import { PasswordNotValidError } from '#root/src/AuthContext/application/errors/PasswordNotValidError.ts'
import { UserNotFoundError } from '#root/src/AuthContext/application/errors/UserNotFoundError.ts';
import { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User.ts';
import { RefreshToken } from '#root/src/AuthContext/domain/refreshToken/RefreshToken.ts';
import { RefreshTokenRepository } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenRepository.ts';
import { RefreshTokenDatetime } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenDatetime';
import { RefreshTokenId } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenId';
import { RequestContextService } from '#root/src/Shared/domain/services/RequestContextService';

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
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @inject(SharedTypes.RequestContextService)
    private readonly requestContextService: RequestContextService
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

    await this.createRefreshToken(user);

    return user;
  }

  private async checkPassword(password: string, hash: string): Promise<void> {
    const isPasswordValid = await this.passwordHasher.verify(password, hash);
    if (!isPasswordValid) {
      throw new PasswordNotValidError({
        email: password,
      });
    }
  }

  private async createRefreshToken(user: User): Promise<RefreshToken> {
    //const refreshToken = await this.refreshTokenRepository.save(user.id.value);
    const refreshToken = RefreshToken.create(
      RefreshTokenId.generate(),
      user.id,
      "tokenHash",
      this.requestContextService.getDevice(),
      this.requestContextService.getIp(),
      this.requestContextService.getUserAgent(),
      RefreshTokenDatetime.now(),
    );

    console.log(refreshToken);

    // await this.refreshTokenRepository.save(refreshToken);

    // return refreshToken;
  }
}