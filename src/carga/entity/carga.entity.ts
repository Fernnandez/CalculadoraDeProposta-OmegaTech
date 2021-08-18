import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';

@Entity({ name: 'cargas' })
export class Carga extends BasicEntity {
    @Column({ type: 'varchar', name: 'nome_empresa' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString()
    public nome_empresa: string;

    @Column({ type: 'numeric', name: 'consumo_kwh' })
    @IsNotEmpty({ message: 'Consumo é obrigatório' })
    @IsNumber()
    public consumo_kwh: number;

    @ManyToMany(() => Proposta, (proposta) => proposta.cargas, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposta_id' })
    public proposta: Proposta;

    constructor(nome_empresa: string, consumo_kwh: number) {
        super();
        this.nome_empresa = nome_empresa;
        this.consumo_kwh = consumo_kwh;
    }
}
