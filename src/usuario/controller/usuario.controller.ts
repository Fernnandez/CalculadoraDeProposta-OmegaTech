import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { Guid } from 'guid-typescript'
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  @Post('create')
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Não existem usuários cadastrados' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado com este ID' })
  findOne(@Param('id') id: Guid) {
    return this.usuarioService.findOne(id.toString());///bugzinho
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado com este ID' })
  update(@Param('id') id: Guid, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado com este ID' })
  remove(@Param('id') id: Guid) {
    return this.usuarioService.remove(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Usuário não autorizado' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}