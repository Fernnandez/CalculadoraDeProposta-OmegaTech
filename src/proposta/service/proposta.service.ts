import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { CargaService } from 'src/carga/service/carga.service';
import { Repository } from 'typeorm';

import { CreatePropostaDto } from '../dtos/create-proposta.dto';

import { Proposta } from '../entity/proposta.entity';

@Injectable()
export class PropostaService {
    constructor(
        private readonly cargaService: CargaService,
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
    ) {}

    async create(dto: CreatePropostaDto) {
        const consumoTotal = this.cargaService.consumoTotal(dto.cargas);
        const periodo = this.calcularPeriodo(dto.data_inicio, dto.data_fim);
        const valorTotal = this.calcularProposta(
            dto.fonte_energia,
            dto.sub_mercado,
            consumoTotal,
        );
        const cargas = await this.cargaService.findCargas(dto.cargas);
        console.log(cargas);
        const proposta = new Proposta(
            dto.data_inicio,
            dto.data_fim,
            dto.fonte_energia,
            dto.sub_mercado,
            valorTotal,
            cargas,
        );
        // salvo o objeto criado
        return this.propostaRepository.save(proposta);
    }

    findAll() {
        return this.propostaRepository.find();
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
    calcularProposta(
        submercado: string,
        font: string,
        consumo_total: number,
        // periodo: number,
    ) {
        const valor_kw = 10;
        let valor_submercado: number;
        let valor_fonte: number;
        let total_value: number;

        switch (submercado) {
            case 'Norte': {
                valor_submercado = 2;
                break;
            }
            case 'Nordeste': {
                valor_submercado = -1;
                break;
            }
            case 'Sul': {
                valor_submercado = 3.5;
                break;
            }
            case 'Sudeste': {
                valor_submercado = 1.5;
                break;
            }
        }

        valor_fonte = font == 'Convencional' ? 5 : -2;
        total_value =
            consumo_total * valor_kw + (valor_submercado + valor_fonte);

        return total_value;
    }
    calcularPeriodo(data_inicio: Date, data_fim: Date) {}

    // async update(id: string, updatePropostaDto: UpdatePropostaDto) {
    //     const proposta = await this.propostaRepository.preload({
    //         id_public: id,
    //         ...updatePropostaDto,
    //     });

    //     if (!proposta) {
    //         throw new NotFoundException(`proposta ID ${id} not found`);
    //     }
    //     return this.propostaRepository.save(proposta);
    // }
}
