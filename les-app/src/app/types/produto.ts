export interface Produto {
    _id: number;
    codigoBarras: string;
    nome: string;
    descricao: string;
    valorCusto: number;
    valorVenda: number;
    quantidade: number;
    ativo: boolean;
}