import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../constants/common.constant';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, default: Role.USER })
    role: Role;

    @Column({ type: 'varchar', length: 255, nullable: true })
    token: string;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]; 
}
