import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaModule } from './proposta/proposta.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(), AuthModule, PropostaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
