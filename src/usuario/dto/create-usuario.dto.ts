import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Kobe Bryant', description: 'Nome do usuário', type: () => String })
  public name: string;

  @ApiProperty({ example: 'something123@email.com', description: 'Email do usuário', type: () => String })
  email: string;

  @ApiProperty({ example: 'batman123!', description: 'Senha do usuário', type: () => String })
  password: string;
}