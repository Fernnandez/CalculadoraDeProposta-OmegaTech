import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    Generated,
    PrimaryColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario extends BasicEntity {
    @Column()
    @MinLength(3, {
        message: 'O nome deve ter no mínimo 3 caracteres',
    })
    @IsString()
    @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
    public nome: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Email incorreto' })
    @IsString()
    @IsNotEmpty({ message: 'O email do usuário é obrigatório' })
    public email: string;

    @Column()
    @MinLength(8, {
        message: 'A senha deve ter no mínimo 8 caracteres',
    })
    @IsString()
    @IsNotEmpty({ message: 'A senha do usuário é obrigatória' })
    public password: string;

    // @OneToMany(() => Proposta, (proposta) => proposta.usuario)
    // public propostas: Proposta[];
}
