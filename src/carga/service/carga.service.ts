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
                nome_empresa: `${cargas[i].nome_empresa}`,
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
        newCarga;
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
        return await this.cargaRepository.find();
    }
    findOne() {}
    // async update(carga: Carga[]) {
    //     const cargas = carga.map((c) => {
    //         this.cargaRepository.update(c.id_public, c);
    //     });
    //     return cargas;
    // }

    // async remove(idProposta: Guid, idCarga: Guid) {
    //     const carga = await this.cargaRepository.findOne(idCarga.toString());

    //     if (!carga) {
    //         throw new NotFoundException(`carga ID ${idCarga} not found`);
    //     }
    //     await this.cargaRepository.remove(carga);

    //     const cargas = await this.cargaRepository.find({
    //         where: { proposta: idProposta },
    //     });
    //     return cargas;
    // }
}
