import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TokenController } from './token.controller';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
    imports: [TypeOrmModule.forFeature([Token]), forwardRef(() => AuthModule), UsuarioModule],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
