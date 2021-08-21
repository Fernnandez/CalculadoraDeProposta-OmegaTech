import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entity/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) {}

    async validateUsuario(email: string, pass: string): Promise<any> {
        const usuario = await this.usuarioService.findByEmail(email);
        //comparando a senha passada pelo user(pass) com a senha cadastrada no DB(password)
        if (usuario && bcrypt.compareSync(pass, usuario.password)) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(user: Usuario) {
        const payload = { username: user.email, sub: user.id_public };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
