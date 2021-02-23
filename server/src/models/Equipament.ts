import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Equipament')
export default class Equipament {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;
}
