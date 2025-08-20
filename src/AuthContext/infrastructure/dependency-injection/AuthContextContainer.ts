import { Container } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { MongoUserRepository } from '#root/src/AuthContext/infrastructure/Repository/MongoUserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { RegisterUserController } from '#root/src/AuthContext/infrastructure/controller/RegisterUserController';
import { RegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/RegisterUserCommandHandler.ts';

export function bindAuthContextContext(container: Container) {
  container
    .bind<RegisterUserController>(TYPES.RegisterUserController)
    .to(RegisterUserController);
  container.bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository);
  container
    .bind<RegisterUserCommandHandler>(TYPES.RegisterUserCommandHandler)
    .to(RegisterUserCommandHandler);
}
