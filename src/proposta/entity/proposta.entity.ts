import {
    Entity,
    Column,
    OneToMany,
    JoinTable,
    ManyToOne,
    ManyToMany,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsDate,
    IsArray,
    IsBoolean,
    IsNumber,
} from 'class-validator';

import { BasicEntity } from 'src/shared/basic-entity';
import { Carga } from 'src/carga/entity/carga.entity';
import { Usuario } from 'src/usuario/entity/usuario.entity';

@Entity({ name: 'propostas' })
export class Proposta extends BasicEntity {
    @Column({ type: 'date' })
    @IsNotEmpty({ message: 'Data inicial é obrigatória' })
    @IsDate()
    public data_inicio: Date;

    @Column({ type: 'date' })
    @IsNotEmpty({ message: 'Data final é obrigatória' })
    @IsDate()
    public data_fim: Date;

    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    public contratado: boolean;

    @Column({ type: 'varchar' })
    @IsNotEmpty({ message: 'Fonte de energia é obrigatório' })
    @IsString()
    public fonte_energia: string;

    @Column({ type: 'varchar' })
    @IsNotEmpty({ message: 'Submercado é obrigatório' })
    @IsString()
    public sub_mercado: string;

    @Column({ type: 'numeric' })
    @IsNotEmpty()
    @IsNumber()
    public valor_proposta: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.propostas)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToMany((type) => Carga, (carga) => carga.proposta, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({})
    @IsNotEmpty({ message: 'Você deve adicionar pelo menos uma carga' })
    @IsArray()
    cargas: Carga[];

    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        usuario: Usuario,
        cargas: Carga[],
    ) {
        super();
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.usuario = usuario;
        this.cargas = cargas;
    }
}
