import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createExercises1614094598679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'exercises',
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
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'observation',
                    type: 'varchar'
                },
                {
                    name: 'series',
                    type: 'decimal'
                },
                {
                    name: 'repetitions',
                    type: 'decimal'
                },
                {
                    name: 'rest',
                    type: 'decimal'
                },
                {
                    name: 'day',
                    type: 'varchar'
                },
                {
                    name: 'schedule',
                    type: 'varchar'
                },
                {
                    name: 'equipment_id',
                    type: 'integer'
                },
                {
                    name: 'record_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ExerciseEquipment',
                    columnNames: ['equipment_id'],
                    referencedTableName: 'equipments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'ExerciseRecord',
                    columnNames: ['record_id'],
                    referencedTableName: 'records',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exercises');
    }

}
