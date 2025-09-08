export const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  IdentityRepository: Symbol.for('IdentityRepository'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  RegisterUserController: Symbol.for('RegisterUserController'),
  LoginUserController: Symbol.for('LoginUserController'),
  LocalLoginUserCommandHandler: Symbol.for('LocalLoginUserCommandHandler'),
  LocalRegisterUserCommandHandler: Symbol.for('LocalRegisterUserCommandHandler'),
  GoogleAuthController: Symbol.for('GoogleAuthController'),
  GoogleRegisterUserCommandHandler: Symbol.for('GoogleRegisterUserCommandHandler'),
  JwtService: Symbol.for('JwtService'),
  PasswordHasher: Symbol.for('PasswordHasher'),
};
