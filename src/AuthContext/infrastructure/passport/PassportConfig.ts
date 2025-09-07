import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '#root/config/env.ts';
import type { Container } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { GoogleRegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/GoogleRegisterUserCommandHandler.ts';
import { GoogleRegisterUserCommand } from '#root/src/AuthContext/application/Command/GoogleRegisterUserCommand.ts';

export function configureGoogleStrategy(container: Container) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
        callbackURL: env.GOOGLE_CALLBACK_URL!,
        scope: ['email', 'profile'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const commandHandler = container.get<GoogleRegisterUserCommandHandler>(
            TYPES.GoogleRegisterUserCommandHandler
          );

          const command = new GoogleRegisterUserCommand(
            profile.id,
            profile.emails![0].value,
            profile.displayName,
            profile.photos![0].value
          );

          await commandHandler.handle(command);
          return done(null, {
            id: profile.id,
            email: profile.emails![0].value,
            provider: 'google',
            name: profile.displayName,
            avatar: profile.photos![0].value,
          });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id.value);
  });

  passport.deserializeUser((id: string, done) => {
    done(null, { id });
  });
}
