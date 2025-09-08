import { IdentityEmail } from "#root/src/AuthContext/domain/identity/IdentityEmail.ts";
import { Identity } from "#root/src/AuthContext/domain/identity/Identity.ts";

export interface IdentityRepository {
  save(identity: Identity): Promise<void>;
  update(identity: Identity): Promise<void>;
  findByEmail(email: IdentityEmail): Promise<Identity | null>;
  findByGoogleId(googleId: string): Promise<Identity | null>;
}