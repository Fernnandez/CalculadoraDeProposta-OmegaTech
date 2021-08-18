import { Guid } from 'guid-typescript';
import { BasicEntity } from './basic-entity';

export interface IController<TEntity extends BasicEntity> {
    add(dto: any): void;
    findOne(id: Guid): TEntity;
    findAll(): TEntity[];
    remove(id: Guid): void;
    update(id: Guid, dto: any): void;
}
