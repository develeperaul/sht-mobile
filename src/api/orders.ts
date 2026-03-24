import type { ShowOfferItem, DirectionItem } from './directions';
import { api } from './index';
import type { DataObj } from 'src/models/api';

export function all(params: OrdersAllParams = {}) {
  return api.mainKy.get<DataObj<OrderListItem[]>>('orders', { searchParams: params }).json();
}

export type OrdersAllParams = {
  type?: 'upcoming' | 'past',
}

export interface OrderListItem {
    id:           string;
    offer:        OrderOfferItem;
    status:       string;
    chat_url:     null;
    contract_url: null;
    payment_url:  null;
    voucher_url:  string;
    final_price:  string;
    final_prepay: string;
    tickets:      any[];
}

export type OrderOfferItem = ShowOfferItem & { direction: DirectionItem };
