import { Proposta } from 'src/proposta/entity/proposta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, Generated } from 'typeorm';

@Entity('token')
export class Token {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    hash: string;

    @Column()
    username: string;
}
