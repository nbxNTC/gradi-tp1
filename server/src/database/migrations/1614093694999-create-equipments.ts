import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createEquipments1614093694999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'equipments',
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
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
