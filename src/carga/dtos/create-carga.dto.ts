export class CreateCargaDto {
    public nome_empresa: string;
    public consumo_kwh: number;

    constructor(nome_empresa: string, consumo_kwh: number) {
        this.nome_empresa = nome_empresa;
        this.consumo_kwh = consumo_kwh;
    }
}
