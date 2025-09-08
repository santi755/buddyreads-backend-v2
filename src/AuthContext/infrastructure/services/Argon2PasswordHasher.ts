import argon2 from 'argon2';
import { injectable } from "inversify";

import { PasswordHasher } from "#root/src/AuthContext/domain/services/PasswordHasher.ts";

@injectable()
export class Argon2PasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}