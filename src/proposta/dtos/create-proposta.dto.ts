import { Carga } from '../entity/carga.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropostaDto {
    @ApiProperty({
        example: '16/07/2021',
        description: 'Data de criação da proposta',
        type: () => Date,
    })
    public data_inicio: Date;

    @ApiProperty({
        example: '22/04/2025',
        description: 'Data do fim da proposta',
        type: () => Date,
    })
    public data_fim: Date;

    @ApiProperty({
        example: 'NORDESTE',
        description: 'Divisões de submercados de energia',
        type: () => String,
    })
    public sub_mercado: string;

    @ApiProperty({
        example: 'RENOVÁVEL',
        description: 'Tipos de fontes de energia',
        type: () => String,
    })
    public fonte_energia: string;

    @ApiProperty({
        description: 'Cargas vinculadas à proposta',
        type: () => Object,
    })
    public cargas: Carga[];
}
