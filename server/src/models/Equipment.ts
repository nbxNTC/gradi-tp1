import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Exercise from './Exercise';

@Entity('equipments')
export default class Equipment {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Exercise, exercise => exercise.equipment, {
        cascade: ['insert', 'update']
    })

    @JoinColumn({name: 'equipment_id'})
    exercises!: Exercise;
}
