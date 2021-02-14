import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1613316283594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'birth_date',
                    type: 'date'
                },
                {
                    name: 'weight',
                    type: 'decimal'
                },
                {
                    name: 'height',
                    type: 'decimal'
                },
                {
                    name: 'gender',
                    type: 'boolean'
                },
                {
                    name: 'observation',
                    type: 'text'
                },
                {
                    name: 'role',
                    type: 'boolean'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}