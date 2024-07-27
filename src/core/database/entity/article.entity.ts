import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content?: string;

    @Column({ type: "text" })
    title?: string;

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

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ nullable: true })
    categoryId: number;

    @OneToMany(() => Comment, comment => comment.article)
    comment: Comment[]

    @Column({ default: 0 })
    view: number;
}