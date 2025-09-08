import { Container } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
//import { MongoUserRepository } from '#root/src/AuthContext/infrastructure/persistence/repository/MongoUserRepository.ts';
import { DrizzleUserRepository } from '#root/src/AuthContext/infrastructure/persistence/repository/DrizzleUserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { RegisterUserController } from '#root/src/AuthContext/infrastructure/http/controller/RegisterUserController.ts';
import { LocalRegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/LocalRegisterUserCommandHandler.ts';
import { GoogleAuthController } from '#root/src/AuthContext/infrastructure/http/controller/GoogleAuthController.ts';
import { GoogleRegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/GoogleRegisterUserCommandHandler.ts';
import { JwtService } from '#root/src/AuthContext/infrastructure/services/JwtService.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository.ts';
import { RefreshTokenRepository } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenRepository.ts';
import { DrizzleIdentityRepository } from '#root/src/AuthContext/infrastructure/persistence/repository/DrizzleIdentityRepository.ts';
import { DrizzleRefreshTokenRepository } from '#root/src/AuthContext/infrastructure/persistence/repository/DrizzleRefreshTokenRepository.ts';
import { PasswordHasher } from '#root/src/AuthContext/domain/services/PasswordHasher.ts';
import { Argon2PasswordHasher } from '#root/src/AuthContext/infrastructure/services/Argon2PasswordHasher.ts';
import { LocalLoginUserCommandHandler } from '#root/src/AuthContext/application/Command/LocalLoginUserCommandHandler.ts';
import { LoginUserController } from '#root/src/AuthContext/infrastructure/http/controller/LoginUserController.ts';

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
    .bind<LocalLoginUserCommandHandler>(TYPES.LocalLoginUserCommandHandler)
    .to(LocalLoginUserCommandHandler);
  container
    .bind<LoginUserController>(TYPES.LoginUserController)
    .to(LoginUserController);
  container
    .bind<GoogleRegisterUserCommandHandler>(TYPES.GoogleRegisterUserCommandHandler)
    .to(GoogleRegisterUserCommandHandler);
  container
    .bind<GoogleAuthController>(TYPES.GoogleAuthController)
    .to(GoogleAuthController);
  container.bind<JwtService>(TYPES.JwtService).to(JwtService);
  container.bind<PasswordHasher>(TYPES.PasswordHasher).to(Argon2PasswordHasher);
}
