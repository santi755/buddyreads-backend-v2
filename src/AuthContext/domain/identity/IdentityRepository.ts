import { Identity } from "./Identity";

export interface IdentityRepository {
  save(identity: Identity): Promise<void>;
  update(identity: Identity): Promise<void>;
  findByEmail(email: string): Promise<Identity | null>;
  findByGoogleId(googleId: string): Promise<Identity | null>;
}