import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { ApiEndpoint } from '#root/src/Shared/infrastructure/http/decorators/ApiEndpoint.ts';
import {
  RegisterUserSchema,
  type RegisterUserDTO,
} from '#root/src/AuthContext/infrastructure/http/controller/RegisterUserDto.ts';
import { RegisterUserCommandHandler } from '#root/src/AuthContext/application/Command/RegisterUserCommandHandler.ts';
import { RegisterUserCommand } from '#root/src/AuthContext/application/Command/RegisterUserCommand.ts';

@injectable()
export class RegisterUserController {
  constructor(
    @inject(TYPES.RegisterUserCommandHandler)
    private readonly registerUserCommandHandler: RegisterUserCommandHandler
  ) {}

  // TODO: Refactor "bodySchema" to bodyDto or bodySchema to bodySchemaDto
  @ApiEndpoint({
    bodySchema: RegisterUserSchema,
    successStatus: 201,
  })
  async execute(
    body: RegisterUserDTO
  ): Promise<{ success: boolean; message: string }> {
    console.log('--- Antes de petar 1');
    const command = RegisterUserCommand.create(
      body.id,
      body.email,
      body.password
    );
    await this.registerUserCommandHandler.handle(command);

    return {
      success: true,
      message: 'User registered successfully',
    };
  }
}
