import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guid } from 'guid-typescript';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto) {
        const { nome, email, password } = createUsuarioDto;

        //criptografando a senha
        const passwordHash = bcrypt.hashSync(password, 8);
        // crio o objeto com base no dto
        const usuario = new Usuario(nome, email, passwordHash);

        // Verificando a existência desse email
        const usuarioDuplicado = await this.usuarioRepository.findOne({
            email: usuario.email,
        });
        if (usuarioDuplicado) {
            throw new ConflictException(
                `Usuário com email ${usuario.email} já existe.`,
            );
        }
        // salvo o objeto criado
        await this.usuarioRepository.save(usuario);
    }

    findAll() {
        return this.usuarioRepository.find();
    }

    async findOne(id_public: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne(id_public);
    }

    async findByEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({ email: email });
    }

    async update(id: Guid, updateUsuarioDto: UpdateUsuarioDto) {
        const usuario = await this.usuarioRepository.preload({
            id_public: id.toString(),
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
