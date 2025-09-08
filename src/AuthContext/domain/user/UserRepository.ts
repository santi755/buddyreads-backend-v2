import { UserEmail } from "#root/src/AuthContext/domain/user/UserEmail.ts";
import { User } from '#root/src/AuthContext/domain/user/User.ts';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
}
