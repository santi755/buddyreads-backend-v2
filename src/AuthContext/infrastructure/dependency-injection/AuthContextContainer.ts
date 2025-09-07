import { Container } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { MongoUserRepository } from '#root/src/AuthContext/infrastructure/Repository/MongoUserRepository.ts';
import { DrizzleUserRepository } from '#root/src/AuthContext/infrastructure/persistence/repository/DrizzleUserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { RegisterUserController } from '#root/src/AuthContext/infrastructure/http/controller/RegisterUserController.ts';
import { LocalRegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/LocalRegisterUserCommandHandler.ts';
import { GoogleAuthController } from '#root/src/AuthContext/infrastructure/http/controller/GoogleAuthController.ts';
import { GoogleLoginCommandHandler } from '#root/src/AuthContext/application/Command/GoogleLoginCommandHandler.ts';
import { JwtService } from '#root/src/AuthContext/infrastructure/services/JwtService.ts';
import { IdentityRepository } from '../../domain/identity/IdentityRepository.ts';
import { RefreshTokenRepository } from '../../domain/refreshToken/RefreshTokenRepository.ts';
import { DrizzleIdentityRepository } from '../../infrastructure/persistence/repository/DrizzleIdentityRepository.ts';
import { DrizzleRefreshTokenRepository } from '../../infrastructure/persistence/repository/DrizzleRefreshTokenRepository.ts';

export function bindAuthContextContext(container: Container) {
  container
    .bind<RegisterUserController>(TYPES.RegisterUserController)
    .to(RegisterUserController);
  
  // Usar Drizzle como repositorio principal y MongoDB para proyecciones
  container.bind<UserRepository>(TYPES.UserRepository).to(DrizzleUserRepository);
  container.bind<IdentityRepository>(TYPES.IdentityRepository).to(DrizzleIdentityRepository);
  container.bind<RefreshTokenRepository>(TYPES.RefreshTokenRepository).to(DrizzleRefreshTokenRepository);
  container
    .bind<LocalRegisterUserCommandHandler>(TYPES.LocalRegisterUserCommandHandler)
    .to(LocalRegisterUserCommandHandler);
  container
    .bind<GoogleLoginCommandHandler>(TYPES.GoogleLoginCommandHandler)
    .to(GoogleLoginCommandHandler);
  container
    .bind<GoogleAuthController>(TYPES.GoogleAuthController)
    .to(GoogleAuthController);
  container.bind<JwtService>(TYPES.JwtService).to(JwtService);
}
