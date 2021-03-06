import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMovieTable1597245783001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movies",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "tickets",
                    type: "integer",
                    isNullable: false
                },
                {
                    name: "assignee",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "account_owner",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "identifier",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "plot_summary",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "image",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "year",
                    type: "text",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                 {
                     name: "username",
                     type: "text",
                     isPrimary: true,

                 },
                 {
                    name: "password",
                    type: "varchar",

                }
            ]
        }), true);
        queryRunner.clearSqlMemory();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable("movies");
    }

}
