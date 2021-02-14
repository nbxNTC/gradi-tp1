import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';


@Entity('records')
export default class Record {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    information!: string;

    @Column()
    user_id!: number;
    
    @ManyToOne(() => User, user => user.records)
    @JoinColumn({ name: 'user_id'})
    user!: User;
}
