import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn
} from "typeorm";

@Entity('users')

export class User extends BaseEntity{
    @Column()
    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

}