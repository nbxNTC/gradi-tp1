import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Equipment from './Equipment';


@Entity('exercises')
export default class Equipament {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    title!: string;

    @Column()
    observation!: string;

    @Column()
    series!: number;

    @Column()
    repetitions!: number;

    @Column()
    rest!: number;

    @Column()
    equipment_id!: number;

    @ManyToOne(() => Equipment, equipment => equipment.exercises)
    @JoinColumn({ name: 'equipment_id'})
    equipemnt!: Equipament;
}
