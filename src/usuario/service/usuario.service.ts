import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    create(createUsuarioDto: CreateUsuarioDto) {
        // crio o objeto com base no dto
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        // salvo o objeto criado
        return this.usuarioRepository.save(usuario);
    }

    findAll() {
        return this.usuarioRepository.find();
    }

    findOne(id: Guid) {
        const usuario = this.usuarioRepository.findOne(id.toString());
        return usuario;
    }

    async update(id: Guid, updateUsuarioDto: UpdateUsuarioDto) {
        const usuario = await this.usuarioRepository.preload({
            id: id.toString(),
            ...updateUsuarioDto,
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario ID ${id} not found`);
        }
        return this.usuarioRepository.save(usuario);
    }

    async remove(id: Guid) {
        const usuario = await this.usuarioRepository.findOne(id.toString());

        if (!usuario) {
            throw new NotFoundException(`Usuario ID ${id} not found`);
        }
        return this.usuarioRepository.remove(usuario);
    }
}
