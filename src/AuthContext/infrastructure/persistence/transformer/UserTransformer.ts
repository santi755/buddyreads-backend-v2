import { User } from "#root/src/AuthContext/domain/user/User.ts";
import { UserId } from "#root/src/AuthContext/domain/user/UserId.ts";
import { UserEmail } from "#root/src/AuthContext/domain/user/UserEmail.ts";
import { Identity } from "#root/src/AuthContext/domain/user/Identity";
import { UserDatetime } from "#root/src/AuthContext/domain/user/UserDatetime";


export class UserTransformer {
  static toDomain(user: any, identities: Identity[] = []): User {
    return User.create(
      UserId.fromString(user.id),
      user.name,
      user.avatar,
      UserEmail.generate(user.primaryEmail),
      identities,
      user.isActive,
      user.isEmailVerified,
      user.lastLoginAt ? UserDatetime.fromDate(new Date(user.lastLoginAt)) : null,
      UserDatetime.fromDate(new Date(user.createdAt)),
      UserDatetime.fromDate(new Date(user.updatedAt))
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id.value,
      name: user.name,
      avatar: user.avatar,
      primaryEmail: user.primaryEmail.value,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt?.value || null,
      createdAt: user.createdAt.value,
      updatedAt: user.updatedAt.value,
    };
  }
}