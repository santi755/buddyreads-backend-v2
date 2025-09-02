import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'string', unique: true })
  email!: string;

  @Property({ type: 'string', nullable: true })
  password?: string | null;

  @Property({ type: 'string', nullable: true })
  googleId?: string | null;

  @Property({ type: 'string', nullable: true })
  name?: string | null;

  @Property({ type: 'string', nullable: true })
  avatar?: string | null;

  @Property({ type: 'string' })
  provider!: 'local' | 'google' | string;

  @Property({ type: 'integer', default: 1 })
  tokenVersion!: number;

  @Property({ type: 'datetime' })
  createdAt!: Date;

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt!: Date;

  constructor() {}
}
