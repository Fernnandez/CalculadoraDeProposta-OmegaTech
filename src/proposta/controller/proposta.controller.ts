import {
    BadRequestException,
    Body,
    Delete,
    HttpCode,
    Patch,
    Put,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { Guid } from 'guid-typescript';

import { CreatePropostaDto } from '../dtos/create-proposta.dto';
import { UpdatePropostaDto } from '../dtos/update-proposta.dto';
import { Proposta } from '../entity/proposta.entity';
import { PropostaService } from '../service/proposta.service';

@Controller('proposta')
export class PropostaController {
    constructor(private readonly service: PropostaService) {}

    @Post()
    create(@Body() createPropostaDto: CreatePropostaDto) {
        return this.service.create(createPropostaDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: Guid) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: Guid,
        @Body() updatePropostaDto: UpdatePropostaDto,
    ) {
        return this.service.update(id, updatePropostaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: Guid) {
        return this.service.remove(id);
    }
}
