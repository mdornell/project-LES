import { Fornecedor } from './fornecedor';

export interface PagamentoFornecedor {
    _id?: number;
    descricao: string;
    dataVencimento: string; // formato ISO (yyyy-MM-dd)
    dataPagamento: string;  // formato ISO
    metodo: string;
    valorPago: number;
    fornecedor: Fornecedor | null;
}
