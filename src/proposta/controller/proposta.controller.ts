import { Body, Delete, Patch, Request, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { PropostaService } from '../service/proposta.service';

@Controller('proposta')
export class PropostaController {
    constructor(private readonly service: PropostaService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPropostaDto: CreatePropostaDto, @Request() req) {
        return this.service.create(createPropostaDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req) {
        return this.service.findAll(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: Guid) {
        return this.service.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: Guid) {
        return this.service.remove(id);
    }

    @Patch(':id')
    contratarProposta(@Param('id') id: Guid) {
        return this.service.contratar(id);
    }
    @Post('/valor')
    valorTotal(@Body() dto: any) {
        return this.service.calcularProposta(
            dto.fonte_energia,
            dto.sub_mercado,
            dto.consumo_total,
            dto.dias,
            dto.anos,
        );
    }
}
