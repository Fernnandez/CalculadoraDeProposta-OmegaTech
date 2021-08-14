import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Guid } from 'guid-typescript';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: Guid) {
        return this.usuarioService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: Guid, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: Guid) {
        return this.usuarioService.remove(id);
    }
}
