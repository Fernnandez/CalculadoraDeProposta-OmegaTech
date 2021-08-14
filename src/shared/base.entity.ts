import { Guid } from 'guid-typescript';
import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

export abstract class Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    id_public: string;

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
