//import { Guid } from 'guid-typescript'
import { Column, CreateDateColumn, Entity, ManyToMany } from 'typeorm';
import { Proposta } from 'src/proposta/entity/proposta.entity';
import { BasicEntity } from 'src/shared/basic-entity';

@Entity({ name: 'carga' })
export class Carga extends BasicEntity {
    @Column({ type: 'varchar' })
    private company_name: string;

    @Column({ type: 'numeric' })
    private kw_consume: number;

    @Column({ type: 'varchar' })
    private proposta_id: string;

    @ManyToMany(() => Proposta, (proposta) => proposta.carga)
    proposta: Proposta[];

    constructor(company_name: string, kw_consume: number, proposta_id: string) {
        super();
        this.company_name = company_name;
        this.kw_consume = kw_consume;
        this.proposta_id = proposta_id;
    }
}
