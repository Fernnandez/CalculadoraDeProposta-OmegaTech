import { Proposta } from 'src/proposta/entity/proposta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, Generated } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @Column({ type: 'int' })
    @Generated('increment')
    id: number;

    @PrimaryGeneratedColumn("uuid")
    id_public: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: string;

    @OneToMany(() => Proposta, (proposta) => proposta.usuario)
    propostas: Proposta[];
}
