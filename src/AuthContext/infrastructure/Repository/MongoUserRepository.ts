import { mongoose } from '#root/src/Shared/infrastructure/persistence/mongodb/MongoClient.ts';

import { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/User.ts';

export class MongoUserRepository implements UserRepository {
  async save(user: User) {
    return await mongoose.Collection('users').save(user);
  }
}
