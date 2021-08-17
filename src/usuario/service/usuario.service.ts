import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(new Usuario(createUsuarioDto.nome, createUsuarioDto.email, bcrypt.hashSync(createUsuarioDto.password, 8)));
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ email: email });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario ID ${id} not found`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOne(id);

    if (!usuario) {
      throw new NotFoundException(`Usuario ID ${id} not found`);
    }
    return this.usuarioRepository.remove(usuario);
  }

}
