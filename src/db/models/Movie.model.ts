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
    image: string;
    
    @Column()
    plot_summary: string;

    @Column()
    assignee: string;
    
    @Column()
    tickets: number;
}