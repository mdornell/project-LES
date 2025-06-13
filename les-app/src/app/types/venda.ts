import { Cliente } from './cliente';
import { ItemVenda } from './itemVenda';


export interface Venda {
    _id?: number;
    dataHora: Date;
    descricaoVenda: string;
    peso: number;
    cliente: Cliente;
    cliente_id: number;
    itens: ItemVenda[];
    valorTotal: number;
}
