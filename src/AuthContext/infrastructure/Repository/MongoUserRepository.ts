import { inject, injectable } from 'inversify';
import { Db, Collection } from 'mongodb';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { UserIdAlreadyExistsError } from '#root/src/AuthContext/application/errors/UserIdAlreadyExistsError.ts';

interface UserDocument {
  _id: string; // UUID como string
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class MongoUserRepository implements UserRepository {
  private collection: Collection<UserDocument>;

  constructor(@inject(TYPES.Database) db: Db) {
    this.collection = db.collection('users');
  }

  async save(user: User): Promise<void> {
    try {
      await this.collection.insertOne({
        _id: user.id.value,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new UserIdAlreadyExistsError();
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.collection.findOne({ email });

    if (!user) {
      return null;
    }

    return User.create(
      UserId.fromString(user['_id'].toString()),
      user['email'],
      user['password']
    );
  }
}
