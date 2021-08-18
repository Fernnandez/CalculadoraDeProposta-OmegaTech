import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCargaDto } from '../dtos/create-carga.dto';
import { CargaService } from '../service/carga.service';

@Controller('carga')
export class CargaController {
    constructor(private readonly service: CargaService) {}
    @Get()
    findAll() {
        return this.service.findAll();
    }
    @Post('carga')
    createCarga(@Body() createCargaDto: CreateCargaDto) {
        return this.service.create(createCargaDto);
    }
}
