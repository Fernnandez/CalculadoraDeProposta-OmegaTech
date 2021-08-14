import { Guid } from 'guid-typescript';
import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class BasicEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    public id_public: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    private createdAt: Date;

    constructor() {
        this.id_public = Guid.create().toString();
        this.createdAt = new Date();
    }
}
