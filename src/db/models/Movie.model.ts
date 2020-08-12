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
    id: number;

    @Column()
    name: string;

    @Column()
    plot_summary: string;

    @Column()
    duration: number;
}