export interface Produto {
    _id: number;
    codigoBarras: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    ativo: boolean;
}