import { Guid } from 'guid-typescript';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryColumn({ type: 'uuid', name: 'ID' })
    public id: string;

    @Column({ type: 'date', name: 'DT_CREATED' })
    public createdAt: Date;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(name: string, email: string, password: string) {
        this.id = Guid.create().toString();
        this.createdAt = new Date();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
