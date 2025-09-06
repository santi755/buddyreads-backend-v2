import { User } from "#root/src/AuthContext/domain/user/User";
import { UserId } from "#root/src/AuthContext/domain/user/UserId";
import { UserEmail } from "#root/src/AuthContext/domain/user/UserEmail";

export class UserTransformer {
  static toDomain(user: any): User {
    return User.create(
      UserId.fromString(user.id),
      UserEmail.generate(user.email),
      user.password,
      user.googleId,
      user.name,
      user.avatar,
      user.provider,
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id.value,
      email: user.email.value,
      password: user.password,
      googleId: user.googleId,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt.value,
      updatedAt: user.updatedAt.value,
    };
  }
}