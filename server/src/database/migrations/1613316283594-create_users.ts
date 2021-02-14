import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1613316283594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isUnique: true,
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: 'name',
                    type: 'varchar'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}