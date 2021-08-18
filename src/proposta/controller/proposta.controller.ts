import { Body, Delete, UseGuards } from '@nestjs/common';
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
    create(@Body() createPropostaDto: CreatePropostaDto) {
        return this.service.create(createPropostaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.service.findAll();
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

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updatePropostaDto: UpdatePropostaDto,
    // ) {
    //     return this.service.update(id, updatePropostaDto);
    // }

    // @Post()
    // calculate() {
    //     //TODO
    // }
}
