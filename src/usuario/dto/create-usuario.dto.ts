import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'Nome é obrigatorio' })
    @IsString()
    @ApiProperty({
        example: 'Kobe Bryant',
        description: 'Nome do usuário',
        type: () => String,
    })
    public nome: string;

    @IsEmail({}, { message: 'Email incorreto' })
    @IsString()
    @IsNotEmpty({ message: 'Email é obrigatorio' })
    @ApiProperty({
        example: 'something123@email.com',
        description: 'Email do usuário',
        type: () => String,
    })
    email: string;

    @IsNotEmpty({ message: 'Senha é obriagatoria' })
    @IsString()
    @ApiProperty({
        example: 'batman123!',
        description: 'Senha do usuário',
        type: () => String,
    })
    password: string;
}
