export class GoogleLoginCommand {
  constructor(
    public readonly googleId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly avatar: string
  ) {}
}
