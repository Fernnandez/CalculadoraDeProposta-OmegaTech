import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private readonly usuarioService: UsuarioService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    async save(hash: string, username: string) {
        let objToken = await this.tokenRepository.findOne({username: username})
        if (objToken){
            this.tokenRepository.update(objToken.id, {
                hash: hash
            })
        }else{
            this.tokenRepository.insert({
                hash: hash,
                username: username
            })
        }
    }

    async refreshToken(oldToken: string){
        let objToken = await this.tokenRepository.findOne({ hash: oldToken })
        if (objToken) {
            let usuario = await this.usuarioService.findOne(objToken.username)
            return this.authService.login(usuario)
        }else{//é uma requisição inválida
            return new HttpException({
                errorMessage: 'Token inválido'
            }, HttpStatus.UNAUTHORIZED)
        }
    }

}
