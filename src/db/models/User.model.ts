import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn
} from "typeorm";

@Entity('users')

export class User extends BaseEntity{
    @Column()
    username: string;

    @Column()
    password: string;
    
}