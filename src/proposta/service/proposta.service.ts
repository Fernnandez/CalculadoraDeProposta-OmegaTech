import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from '../entity/proposta.entity';

@Injectable()
export class PropostaService {
    constructor(
        @InjectRepository(Proposta)
        private readonly propostaRepository: Repository<Proposta>,
    ) {}

    readonly kw_value = 10;

    create(createPropostaDto: CreatePropostaDto) {
        // crio o objeto com base no dto
        const proposta = this.propostaRepository.create(createPropostaDto);
        // salvo o objeto criado
        return this.propostaRepository.save(proposta);
    }

    findAll() {
        return this.propostaRepository.find();
    }

    findOne(id: Guid) {
        const proposta = this.propostaRepository.findOne(id.toString());
        return proposta;
    }

    async update(id: Guid, updatePropostaDto: UpdatePropostaDto) {
        const proposta = await this.propostaRepository.preload({
            id: id.toString(),
            ...updatePropostaDto,
        });

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.save(proposta);
    }

    async remove(id: Guid) {
        const proposta = await this.propostaRepository.findOne(id.toString());

        if (!proposta) {
            throw new NotFoundException(`proposta ID ${id} not found`);
        }
        return this.propostaRepository.remove(proposta);
    }

    calculate(sub_market: string, font: string, total_consume: number) {
        let sub_market_value: number;
        let font_value: number;
        let total_value: number;

        switch (sub_market) {
            case 'Norte': {
                sub_market_value = 2;
                break;
            }
            case 'Nordeste': {
                sub_market_value = -1;
                break;
            }
            case 'Sul': {
                sub_market_value = 3.5;
                break;
            }
            case 'Sudeste': {
                sub_market_value = 1.5;
                break;
            }
        }

        font_value = font == 'Convencional' ? 5 : -2;
        total_value =
            total_consume * this.kw_value + (sub_market_value + font_value);

        return total_value;
    }
}
