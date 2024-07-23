import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "../../constants/common.constant";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

    @Column()
    username?: string;

    @Column()
    password: string;

    @Column({ default: Role.USER })
    role: Role;
}   
