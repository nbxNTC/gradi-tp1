import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import User from './User';
import Exercise from './Exercise';


@Entity('records')
export default class Record {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    title!: string;

    @Column()
    observation!: string;

    @Column()
    user_id!: number;
    
    @ManyToOne(() => User, user => user.records)
    @JoinColumn({ name: 'user_id'})
    user!: User;

    @OneToMany(() => Exercise, exercise => exercise.equipment, {
        cascade: ['insert', 'update']
    })

    @JoinColumn({name: 'equipment_id'})
    exercises!: Exercise;
}
