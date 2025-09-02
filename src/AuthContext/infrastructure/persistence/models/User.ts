import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ nullable: true, type: 'string' })
  password?: string | null;  

  @Property({ nullable: true, type: 'string' })
  @Unique()
  googleId?: string | null;  

  @Property({ nullable: true, type: 'string' })
  name?: string | null;      

  @Property({ nullable: true, type: 'string' })
  avatar?: string | null;    

  @Property({ default: 'local' })
  provider!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}