import { Guid } from 'guid-typescript';
import { Carga } from 'src/carga/entity/carga.entity';
import { BasicEntity } from 'src/shared/basic-entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
// import { Entity as BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'proposta' })
export class Proposta extends BasicEntity {
    @Column({ type: 'timestamptz' })
    private data_inicio: Date;

    @Column({ type: 'timestamptz' })
    private data_fim: Date;

    @Column({ type: 'boolean' })
    private contratado: boolean = false;

    @Column({ type: 'varchar', length: 12 })
    private fonte_energia: string;

    @Column({ type: 'varchar', length: 7 })
    private sub_mercado: string;

    @Column({ type: 'numeric' })
    private valor_proposta: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.propostas)
    usuario: Usuario;

    @ManyToMany(() => Carga, (carga) => carga.proposta)
    @JoinTable()
    carga: Carga[];

    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        user: string,
    ) {
        super();
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
    }
}
