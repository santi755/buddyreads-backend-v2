export const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  IdentityRepository: Symbol.for('IdentityRepository'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  RegisterUserController: Symbol.for('RegisterUserController'),
  RegisterUserCommandHandler: Symbol.for('RegisterUserCommandHandler'),
  GoogleAuthController: Symbol.for('GoogleAuthController'),
  GoogleLoginCommandHandler: Symbol.for('GoogleLoginCommandHandler'),
  JwtService: Symbol.for('JwtService'),
};
