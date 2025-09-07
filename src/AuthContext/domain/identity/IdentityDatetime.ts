import { Datetime } from '#root/src/Shared/domain/value-object/Datetime';

export class IdentityDatetime extends Datetime {
  constructor(value: Date) {
    super(value);
  }
}