import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Exercise from './Exercise';

@Entity('equipments')
export default class Equipament {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Exercise, exercise => exercise.equipemnt, {
        cascade: ['insert', 'update']
    })

    @JoinColumn({name: 'equipemnt_id'})
    exercises!: Exercise;
}
