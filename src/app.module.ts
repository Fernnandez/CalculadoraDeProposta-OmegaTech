import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { CargaModule } from './carga/carga.module';
import { PropostaModule } from './proposta/proposta.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 15432,
            username: 'postgres',
            password: 'admin',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsuarioModule,
        CargaModule,
        PropostaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
