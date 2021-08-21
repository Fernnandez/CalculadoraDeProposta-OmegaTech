import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from 'src/usuario/entity/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<Usuario> {
        const user = await this.authService.validateUsuario(username, password);
        if (!user) {
            throw new UnauthorizedException('Usuário ou Senha Incorretos');
        }
        return user;
    }
}
