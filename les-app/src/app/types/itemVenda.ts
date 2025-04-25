export interface ItemVenda {
    _id: number; // Optional since it might be auto-generated
    quantidade: number;
    custo: number;
    vendaId?: number; // Reference to Venda (foreign key)
    produtoId: number; // Reference to Produto (foreign key)
}