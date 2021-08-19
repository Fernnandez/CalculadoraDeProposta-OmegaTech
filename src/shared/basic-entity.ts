import { Guid } from 'guid-typescript';
import { Column, CreateDateColumn, PrimaryColumn, Generated } from 'typeorm';

export abstract class BasicEntity {
    @PrimaryColumn({ type: 'varchar' })
    id_public: string;

    @Column('int')
    @Generated('increment')
    id: number;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    constructor() {
        this.id_public = Guid.create().toString();
        this.createdAt = new Date();
    }
}
