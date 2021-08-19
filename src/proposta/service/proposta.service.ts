import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Guid } from 'guid-typescript';
import { CargaService } from 'src/carga/service/carga.service';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Repository } from 'typeorm';

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
        );
        const cargas = await this.cargaService.findCargas(dto.cargas);
        console.log(cargas);
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
        font: string,
        submercado: string,
        consumo_total: number,
        // periodo: number,
    ) {
        let fonte_value: number;
        let submercado_value: number;
        let valor_total: number;
        console.log(submercado);
        console.log(font);
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

        valor_total = consumo_total * 10 + (submercado_value + fonte_value);

        return valor_total;
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
