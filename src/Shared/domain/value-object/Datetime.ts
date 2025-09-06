export class Datetime {
  constructor(public readonly value: Date) {}

  static now(): Datetime {
    return new Datetime(new Date());
  }

  static fromISOString(value: string): Datetime {
    return new Datetime(new Date(value));
  }
  
  static fromString(value: string): Datetime {
    return new Datetime(new Date(value));
  }

  static fromDate(date: Date): Datetime {
    return new Datetime(date);
  }

  static fromTimestamp(timestamp: number): Datetime {
    return new Datetime(new Date(timestamp * 1000));
  }
}