import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCargaDto } from '../dtos/create-carga.dto';
import { Carga } from '../entity/carga.entity';

@Injectable()
export class CargaService {
    constructor(
        @InjectRepository(Carga)
        private readonly cargaRepository: Repository<Carga>,
    ) {}

    async findCargas(cargas: Carga[]) {
        const carga: Carga[] = [];

        for (let i = 0; i < cargas.length; i++) {
            const c = await this.cargaRepository.find({
                id_public: `${cargas[i]}`,
            });

            if (c.length <= 0) {
                throw new NotFoundException(
                    `Carga inexistente favor informar uma carga válida`,
                );
            }
            carga.push(c[0]);
        }
        return carga;
    }

    async create(carga: CreateCargaDto) {
        const newCarga = new Carga(carga.nome_empresa, carga.consumo_kwh);

        await this.cargaRepository.save(newCarga);
        return newCarga;
    }

    consumoTotal(cargas: Carga[]) {
        const consumoTotal = cargas
            .map((cargas) => cargas.consumo_kwh)
            .reduce((p, c) => {
                return +p + +c;
            });

        return consumoTotal;
    }

    async findAll(): Promise<Carga[]> {
        const cargas = this.cargaRepository.find();
        if (!cargas) {
            throw new Error('nenhum carga no banco');
        }
        return cargas;
    }
}
