import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Guid } from 'guid-typescript';
import { CargaService } from 'src/carga/service/carga.service';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { CreatePropostaDto } from '../dtos/create-proposta.dto';

import { Proposta } from '../entity/proposta.entity';

@Injectable()
export class PropostaService {
    constructor(
        private readonly cargaService: CargaService,
        private readonly usuarioService: UsuarioService,
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
    ) {}

    async create(dto: CreatePropostaDto, user: Usuario) {
        const usuario = await this.usuarioService.findOne(user.id_public);
        const consumoTotal = this.cargaService.consumoTotal(dto.cargas);
        const periodo = this.calcularPeriodo(dto.data_inicio, dto.data_fim);
        const valorTotal = this.calcularProposta(
            dto.fonte_energia,
            dto.sub_mercado,
            consumoTotal,
            periodo,
        );
        const cargas = await this.cargaService.findCargas(dto.cargas);
        const proposta = new Proposta(
            dto.data_inicio,
            dto.data_fim,
            dto.fonte_energia,
            dto.sub_mercado,
            valorTotal,
            usuario,
            cargas,
        );
        // salvo o objeto criado
        return this.propostaRepository.save(proposta);
    }

    async findAll(user: Usuario) {
        const usuario = await this.usuarioService.findOne(user.id_public);
        const propostas = await this.propostaRepository.find({
            usuario: usuario,
        });
        return propostas;
    }

    async findOne(id: Guid) {
        const proposta = this.propostaRepository.findOne(id.toString());
        return proposta;
    }

    async remove(id: Guid) {
        const proposta = await this.propostaRepository.findOne(id.toString());

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.remove(proposta);
    }

    async contratar(id: Guid) {
        const proposta = await this.propostaRepository.findOne(id.toString());
        proposta.contratarProposta();
        console.log(proposta);
        const newProposta = await this.propostaRepository.preload({
            id_public: id,
            ...proposta,
        });

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.save(newProposta);
    }

    //serviços auxiliares

    calcularProposta(
        font: string,
        submercado: string,
        consumo_total: number,
        periodo: number,
    ) {
        let fonte_value: number;
        let submercado_value: number;
        let valor_total: number;
        const valor_kw: number = 10;
        let consumo_diario: number = consumo_total / 30;

        switch (submercado) {
            case 'NORTE': {
                submercado_value = 2;
                break;
            }
            case 'NORDESTE': {
                submercado_value = -1;
                break;
            }
            case 'SUL': {
                submercado_value = 3.5;
                break;
            }
            case 'SUDESTE': {
                submercado_value = 1.5;
                break;
            }
        }

        fonte_value = font == 'CONVENCIONAL' ? 5 : -2;

        valor_total =
            consumo_diario *
            periodo *
            (valor_kw + submercado_value + fonte_value);

        return parseFloat(valor_total.toFixed(2));
    }

    calcularPeriodo(data_inicio: Date, data_fim: Date) {
        const verificaDataInicio = moment().isAfter(data_inicio);
        const verificarDataFim = moment(data_inicio).isBefore(data_fim);

        if (verificaDataInicio) {
            throw new BadRequestException(
                'Data início deve ser maior que a data atual',
            );
        }

        if (!verificarDataFim) {
            throw new BadRequestException(
                'Data fim deve ser maior que a Data inicio',
            );
        }
        const diff = moment(data_fim).diff(moment(data_inicio));

        const dias = moment.duration(diff).asDays();

        return dias;
    }
}
