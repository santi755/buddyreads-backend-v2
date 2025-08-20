import crypto from 'node:crypto';

export class Uuid {
  // Regex más simple pero efectiva
  private static readonly UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  constructor(public readonly value: string) {
    if (!this.isValid()) {
      throw new Error(`Invalid UUID format: ${value}`);
    }
  }

  static generate(): Uuid {
    return new Uuid(crypto.randomUUID());
  }

  static fromString(value: string): Uuid {
    return new Uuid(value);
  }

  static isValidUUID(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    // Validación básica pero robusta
    if (!Uuid.UUID_REGEX.test(value)) {
      return false;
    }

    // No aceptar UUID nulo
    if (value === '00000000-0000-0000-0000-000000000000') {
      return false;
    }

    return true;
  }

  private isValid(): boolean {
    return Uuid.isValidUUID(this.value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Uuid): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }
}
