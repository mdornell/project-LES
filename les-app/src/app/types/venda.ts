import { Cliente } from './cliente';
import { ItemVenda } from './itemVenda';


export interface Venda {
    _id: number;
    dataHora: Date;
    descricaoVenda: string;
    cliente: Cliente;
    itens: ItemVenda[];
    total: number;
}
