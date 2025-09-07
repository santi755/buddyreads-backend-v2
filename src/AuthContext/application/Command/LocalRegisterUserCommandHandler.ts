import { inject, injectable } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { LocalRegisterUserCommand } from '#root/src/AuthContext/application/Command/LocalRegisterUserCommand.ts';
import { User } from '#root/src/AuthContext/domain/user/User';
import { UserAlreadyExistsError } from '#root/src/AuthContext/application/errors/UserAlreadyExistsError.ts';
import { IdentityRepository } from '../../domain/identity/IdentityRepository.ts';
import { IdentityAlreadyExistsError } from '../errors/IdentityAlreadyExistsError.ts';
import { Identity } from '../../domain/identity/Identity.ts';
import { IdentityId } from '../../domain/identity/IdentityId.ts';
import { UserId } from '../../domain/user/UserId.ts';
import { UserDatetime } from '../../domain/user/UserDatetime.ts';

@injectable()
export class LocalRegisterUserCommandHandler {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IdentityRepository
  ) {}

  async handle(command: LocalRegisterUserCommand): Promise<void> {
    const existingIdentity = await this.identityRepository.findByEmail(command.email);
    if (existingIdentity) {
      throw new IdentityAlreadyExistsError({
        email: command.email,
      });
    }

    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new UserAlreadyExistsError({
        email: command.email,
      });
    }

    const user = await this.createUser(command);
    await this.createIdentity(command, user);

    // TODO: User setAsPrimary Identity if it is the first identity
    /*
    const identities = await this.identityRepository.findByUserId(user.id);
    if (identities.length === 1) {
      const identity = identities[0];
      identity.setAsPrimary();
      await this.identityRepository.save(identity);
    }
      */
  }

  private async createIdentity(command: LocalRegisterUserCommand, user: User): Promise<Identity> {
    const identity = Identity.createFromLocal(
      IdentityId.generate(),
      user.id,
      command.getUserEmail(),
      command.password
    );

    await this.identityRepository.save(identity);

    return identity;
  }

  private async createUser(command: LocalRegisterUserCommand): Promise<User> {
    const user = User.create(
      UserId.generate(),
      null,
      null,
      command.getUserEmail(),
      [],
      true,
      false,
      null,
      UserDatetime.now(),
      UserDatetime.now()
    );

    await this.userRepository.save(user);

    return user;
  }
}
