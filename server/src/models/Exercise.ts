import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Equipment from './Equipment';
import Record from './Record';


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
    day!: string;

    @Column()
    schedule!: string;

    @Column({select: false})
    equipment_id!: number;

    @Column({select: false})
    record_id!: number;

    @ManyToOne(() => Equipment, equipment => equipment.exercises)
    @JoinColumn({ name: 'equipment_id'})
    equipment!: Equipment;

    @ManyToOne(() => Record, record => record.exercises)
    @JoinColumn({ name: 'record_id'})
    record!: Record;
}
