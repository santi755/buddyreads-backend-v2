import type { UserReadRepository } from "../../domain/UserRepository.ts";
import { RetrieveUserByIdQuery } from "./RetrieveUserByIdQuery";
import { User } from "../../domain/user/User";
import { UserNotFoundError } from "../../application/errors/UserNotFoundError.ts";

export class RetrieveUserByIdQueryHandler {
  constructor(private readonly userRepository: UserReadRepository) {}

  async handle(query: RetrieveUserByIdQuery): Promise<User> {
    const user = await this.userRepository.findByEmail(query.userId);
    if (!user) {
      throw new UserNotFoundError(query.userId);
    }
    return user;
  }
}