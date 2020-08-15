import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn
} from "typeorm";

@Entity('movies')
export class Movie extends BaseEntity{
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    plot_summary: string;

    @Column()
    assignee: string;

    @Column()
    account_owner: string;

    @Column()
    tickets: number;

    @Column()
    identifier: string;
}