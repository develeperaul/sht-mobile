import { DataObj } from 'src/models/api';
import { api } from './index';

export function all() {
  return api.mainKy.get<DataObj<PromotionsItem[]>>('promotions').json();
}

export function show(id: string) {
  return api.mainKy.get<DataObj<PromotionsItem>>(`promotions/${id}`).json();
}

export interface PromotionsItem {
  uuid:        string;
  description: string;
  link:        string;
  name:        string;
  title:       string;
  image:       PromotionsImage | null;
}

export interface PromotionsImage {
  url: string,
}
