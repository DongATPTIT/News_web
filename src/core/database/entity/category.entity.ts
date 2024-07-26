import { PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;
}