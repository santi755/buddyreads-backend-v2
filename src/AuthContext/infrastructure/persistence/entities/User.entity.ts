import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string | null;

  @Column({ name: 'google_id', type: 'varchar', length: 255, nullable: true })
  googleId?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string | null;

  @Column({
    type: 'enum',
    enum: ['local', 'google'],
    default: 'local',
  })
  provider!: 'local' | 'google';

  @Column({ name: 'token_version', type: 'int', default: 1 })
  tokenVersion!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Factory method para crear desde dominio
  static fromDomain(user: {
    id: string;
    email: string;
    password?: string | null;
    googleId?: string | null;
    name?: string | null;
    avatar?: string | null;
    provider: 'local' | 'google';
    tokenVersion: number;
  }): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.googleId = user.googleId;
    entity.name = user.name;
    entity.avatar = user.avatar;
    entity.provider = user.provider;
    entity.tokenVersion = user.tokenVersion;
    return entity;
  }

  // Método para convertir a dominio
  toDomain() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      googleId: this.googleId,
      name: this.name,
      avatar: this.avatar,
      provider: this.provider,
      tokenVersion: this.tokenVersion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
