import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargaController } from './controller/carga.controller';
import { Carga } from './entity/carga.entity';
import { CargaService } from './service/carga.service';

@Module({
    imports: [TypeOrmModule.forFeature([Carga])],
    controllers: [CargaController],
    providers: [CargaService],
})
export class CargaModule {}
