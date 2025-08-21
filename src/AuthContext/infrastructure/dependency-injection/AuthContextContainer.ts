import { Container } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { MongoUserRepository } from '#root/src/AuthContext/infrastructure/Repository/MongoUserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { RegisterUserController } from '#root/src/AuthContext/infrastructure/controller/RegisterUserController';
import { RegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/RegisterUserCommandHandler.ts';
import { GoogleAuthController } from '#root/src/AuthContext/infrastructure/controller/GoogleAuthController.ts';
import { GoogleLoginCommandHandler } from '#root/src/AuthContext/application/Command/GoogleLoginCommandHandler.ts';
import { JwtService } from '#root/src/AuthContext/infrastructure/services/JwtService.ts';

export function bindAuthContextContext(container: Container) {
  container
    .bind<RegisterUserController>(TYPES.RegisterUserController)
    .to(RegisterUserController);
  container.bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository);
  container
    .bind<RegisterUserCommandHandler>(TYPES.RegisterUserCommandHandler)
    .to(RegisterUserCommandHandler);
  container
    .bind<GoogleLoginCommandHandler>(TYPES.GoogleLoginCommandHandler)
    .to(GoogleLoginCommandHandler);
  container
    .bind<GoogleAuthController>(TYPES.GoogleAuthController)
    .to(GoogleAuthController);
  container.bind<JwtService>(TYPES.JwtService).to(JwtService);
}
