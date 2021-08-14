import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('usuarios')
export class Usuario extends BasicEntity {
    @Column()
    private name: string;

    @Column()
    private email: string;

    @Column()
    private password: string;

    @OneToMany(() => Proposta, (proposta) => proposta.usuario)
    propostas: Proposta[];

    constructor(name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
