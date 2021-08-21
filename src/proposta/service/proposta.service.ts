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
        const cargas = await this.cargaService.findCargas(dto.cargas);
        const consumoTotal = await this.cargaService.consumoTotal(cargas);
        const periodo = await this.calcularPeriodo(
            dto.data_inicio,
            dto.data_fim,
        );
        const valorTotal = await this.calcularProposta(
            dto.fonte_energia,
            dto.sub_mercado,
            consumoTotal,
            periodo.dias,
            periodo.anos,
        );
        if (periodo.anos >= 3) {
            const proposta = new Proposta(
                dto.data_inicio,
                dto.data_fim,
                dto.fonte_energia,
                dto.sub_mercado,
                valorTotal,
                usuario,
                cargas,
                true,
            );
            return this.propostaRepository.save(proposta);
        } else {
            const proposta = new Proposta(
                dto.data_inicio,
                dto.data_fim,
                dto.fonte_energia,
                dto.sub_mercado,
                valorTotal,
                usuario,
                cargas,
                false,
            );
            return this.propostaRepository.save(proposta);
        }

        // salvo o objeto criado
    }

    async findAll(user: Usuario) {
        const usuario = await this.usuarioService.findOne(user.id_public);
        const propostas = await this.propostaRepository.find({
            usuario: usuario,
        });
        const propostasDesc = propostas.sort((b, a) => {
            if (a.id > b.id) {
                return 1;
            } else if (b.id > a.id) {
                return -1;
            }
            return 0;
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
    async desconto(id: Guid) {}

    //serviços auxiliares

    calcularProposta(
        font: string,
        submercado: string,
        consumo_total: number,
        dias: number,
        anos: number,
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

        if (anos >= 3) {
            valor_total =
                (consumo_diario *
                    dias *
                    (valor_kw + submercado_value + fonte_value)) /
                0.05;
        } else {
            valor_total =
                consumo_diario *
                dias *
                (valor_kw + submercado_value + fonte_value);
        }

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
        const anos = moment.duration(diff).asYears();

        return { dias: dias, anos: anos };
    }
}
