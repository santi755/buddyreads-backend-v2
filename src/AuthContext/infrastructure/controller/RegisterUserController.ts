import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { ApiEndpoint } from '#root/src/Shared/infrastructure/http/decorators/ApiEndpoint.ts';
import {
  RegisterUserSchema,
  type RegisterUserDTO,
} from '#root/src/AuthContext/infrastructure/controller/RegisterUserDto.ts';
import { RegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/RegisterUserCommandHandler.ts';
import { RegisterUserCommand } from '#root/src/AuthContext/application/Command/RegisterUserCommand.ts';

@injectable()
export class RegisterUserController {
  constructor(
    @inject(TYPES.RegisterUserCommandHandler)
    private readonly registerUserCommandHandler: RegisterUserCommandHandler
  ) {}

  @ApiEndpoint({
    bodySchema: RegisterUserSchema,
    successStatus: 201,
  })
  async execute(body: RegisterUserDTO): Promise<void> {
    const command = RegisterUserCommand.create(
      body.id,
      body.email,
      body.password
    );
    await this.registerUserCommandHandler.handle(command);
  }
}
