import { Identity } from '#root/src/AuthContext/domain/user/Identity.ts';
import { IdentityId } from '#root/src/AuthContext/domain/user/IdentityId.ts';
import { IdentityEmail } from '#root/src/AuthContext/domain/user/IdentityEmail.ts';
import { IdentityProvider } from '#root/src/AuthContext/domain/user/IdentityProvider.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { IdentityDatetime } from '#root/src/AuthContext/domain/user/IdentityDatetime.ts';

export class IdentityTransformer {
  static toDomain(identity: any): Identity {
    return new Identity(
      IdentityId.fromString(identity.id),
      UserId.fromString(identity.userId),
      IdentityEmail.generate(identity.email),
      IdentityProvider.fromProvider(identity.provider),
      identity.providerId,
      identity.password,
      identity.isVerified,
      identity.isPrimary,
      identity.lastUsedAt ? IdentityDatetime.fromDate(new Date(identity.lastUsedAt)) : null,
      IdentityDatetime.fromDate(new Date(identity.createdAt)),
      IdentityDatetime.fromDate(new Date(identity.updatedAt))
    );
  }

  static toPersistence(identity: Identity): any {
    return {
      id: identity.id.value,
      userId: identity.userId.value,
      email: identity.email.value,
      provider: identity.provider.value,
      providerId: identity.providerId,
      password: identity.password,
      isVerified: identity.isVerified,
      isPrimary: identity.isPrimary,
      lastUsedAt: identity.lastUsedAt?.value || null,
      createdAt: identity.createdAt.value,
      updatedAt: identity.updatedAt.value,
    };
  }

  static toPersistenceUpdate(identity: Identity): any {
    return {
      email: identity.email.value,
      provider: identity.provider.value,
      providerId: identity.providerId,
      password: identity.password,
      isVerified: identity.isVerified,
      isPrimary: identity.isPrimary,
      lastUsedAt: identity.lastUsedAt?.value || null,
      updatedAt: identity.updatedAt.value,
    };
  }
}