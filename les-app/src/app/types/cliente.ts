export interface Cliente {
    _id: number;
    nome: string;
    email: string;
    saldo: number;
    codigoRFID: string;
    dataAniversario: string;
    ativo: boolean;
}