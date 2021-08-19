import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargaController } from 'src/carga/controller/carga.controller';
import { Carga } from 'src/carga/entity/carga.entity';
import { CargaService } from 'src/carga/service/carga.service';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { PropostaController } from './controller/proposta.controller';
import { Proposta } from './entity/proposta.entity';
import { PropostaService } from './service/proposta.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposta, Carga, Usuario])],
    controllers: [PropostaController, CargaController],
    providers: [PropostaService, CargaService, UsuarioService],
})
export class PropostaModule {}
