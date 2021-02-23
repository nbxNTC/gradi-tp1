import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('equipments')
export default class Equipament {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;
}
