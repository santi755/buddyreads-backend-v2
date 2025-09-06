import { Datetime } from '#root/src/Shared/domain/value-object/Datetime.ts';


export class UserDatetime extends Datetime {
  constructor(value: Date) {
    super(value);
  }
}   