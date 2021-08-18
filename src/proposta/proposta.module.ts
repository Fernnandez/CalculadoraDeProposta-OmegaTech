import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargaController } from 'src/carga/controller/carga.controller';
import { Carga } from 'src/carga/entity/carga.entity';
import { CargaService } from 'src/carga/service/carga.service';
import { PropostaController } from './controller/proposta.controller';
import { Proposta } from './entity/proposta.entity';
import { PropostaService } from './service/proposta.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposta, Carga])],
    controllers: [PropostaController, CargaController],
    providers: [PropostaService, CargaService],
})
export class PropostaModule {}
