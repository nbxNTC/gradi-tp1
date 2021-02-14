import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Record from './Record'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @Column()
    birth_date!: Date;

    @Column()
    weight!: number;

    @Column()
    height!: number;

    @Column()
    gender!: boolean;

    @Column()
    observation!: boolean;

    @Column()
    role!: boolean;

    @OneToMany(() => Record, record => record.user, {
        cascade: ['insert', 'update']
    })

    @JoinColumn({name: 'user_id'})
    records!: Record;
}
