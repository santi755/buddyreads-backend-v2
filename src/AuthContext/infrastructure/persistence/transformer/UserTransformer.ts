import { User } from "#root/src/AuthContext/domain/user/User.ts";
import { UserId } from "#root/src/AuthContext/domain/user/UserId.ts";
import { UserEmail } from "#root/src/AuthContext/domain/user/UserEmail.ts";

export class UserTransformer {
  static toDomain(user: any): User {
    return User.create(
      UserId.fromString(user.id),
      user.name,
      user.avatar,
      UserEmail.generate(user.primaryEmail),
      user.createdAt,
      user.updatedAt,
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id.value,
      primaryEmail: user.primaryEmail.value,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt.value,
      updatedAt: user.updatedAt.value,
    };
  }
}