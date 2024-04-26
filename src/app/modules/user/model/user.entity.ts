//* User Entity
//* This will be modified later

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BuildableEntity from '../../../../common/lib/buildableEntity';

@Entity('User')
export class User extends BuildableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ident: string;

    @Column()
    password: string;

    @Column()
    name: string;
}
