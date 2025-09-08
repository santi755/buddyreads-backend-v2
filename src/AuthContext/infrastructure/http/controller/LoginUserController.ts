import { LocalLoginUserCommand } from "#root/src/AuthContext/application/Command/LocalLoginUserCommand";
import { ApiEndpoint } from "#root/src/Shared/infrastructure/http/decorators/ApiEndpoint";
import { LoginUserSchema, LoginUserDTO } from "#root/src/AuthContext/infrastructure/http/controller/LoginUserDto";
import { LocalLoginUserCommandHandler } from "#root/src/AuthContext/application/Command/LocalLoginUserCommandHandler";
import { TYPES } from "#root/src/AuthContext/infrastructure/dependency-injection/Tokens";
import { inject, injectable } from "inversify";

@injectable()
export class LoginUserController {
  constructor(
    @inject(TYPES.LocalLoginUserCommandHandler)
    private readonly loginUserCommandHandler: LocalLoginUserCommandHandler
  ) {}

  @ApiEndpoint({
    bodySchema: LoginUserSchema,
    successStatus: 200,
  })
  async execute(
    body: LoginUserDTO,
  ): Promise<{ success: boolean; message: string }> {
    const command = LocalLoginUserCommand.create(
      body.email,
      body.password
    );

    await this.loginUserCommandHandler.handle(command);

    return {
      success: true,
      message: 'User logged in successfully',
    };
  }
}