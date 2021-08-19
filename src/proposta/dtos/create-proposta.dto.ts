import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Carga } from 'src/carga/entity/carga.entity';

export class CreatePropostaDto {
    @IsNotEmpty({ message: 'Data inicial é obrigatória' })
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

    constructor(
        data_inicio: Date,
        data_fim: Date,
        sub_mercado: string,
        fonte_energia: string,
        cargas: Carga[],
    ) {
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.sub_mercado = sub_mercado;
        this.fonte_energia = fonte_energia;
        this.cargas = cargas;
    }
}
