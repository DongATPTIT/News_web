import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Article } from "./article.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Article, article => article.comment)
    article: Article;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
}