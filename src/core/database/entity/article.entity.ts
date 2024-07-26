import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column()
    keyword: string;

    @Column()
    imageUrl: string;

    @Column({ default: false })
    published: Boolean;

    @Column()
    author: string;

    @Column()
    category: string;

}