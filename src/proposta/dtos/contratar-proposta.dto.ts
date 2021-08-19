import { Carga } from 'src/carga/entity/carga.entity';

export class ContratarPropostaDto {
    public data_inicio: Date;
    public data_fim: Date;
    public fonte_energia: string;
    public sub_mercado: string;
    public valor_proposta: number;
    public carga: Carga[];
    constructor(
        data_inicio: Date,
        data_fim: Date,
        fonte_energia: string,
        sub_mercado: string,
        valor_proposta: number,
        carga: Carga[],
    ) {
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.fonte_energia = fonte_energia;
        this.sub_mercado = sub_mercado;
        this.valor_proposta = valor_proposta;
        this.carga = carga;
    }
}
