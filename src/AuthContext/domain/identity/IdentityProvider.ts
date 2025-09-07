const ID_PROVIDERS = {
    GOOGLE: 'google',
    LOCAL: 'local',
  };
  
  export class IdentityProvider {
    constructor(public readonly value: string) {
      if (!this.isValid(value)) {
        throw new Error(`Invalid identity provider format: ${value}`);
      }
    }
  
    static fromProvider(value: string): IdentityProvider {
      return new IdentityProvider(value);
    }

    static createLocal(): IdentityProvider {
      return new IdentityProvider(ID_PROVIDERS.LOCAL);
    }
  
    private isValid(value: string): boolean {
      return Object.values(ID_PROVIDERS).includes(value);
    }
  }