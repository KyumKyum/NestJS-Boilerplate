//* User Entity
//* This will be modified later

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import BuildableEntity from '../../../../common/lib/buildableEntity';

@Entity('User')
export class User extends BuildableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    ident: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column({unique: true})
    phoneNum: string

    @Column({unique: true})
    email:string
}
