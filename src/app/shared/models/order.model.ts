import { CartItem } from './cart-item.model';

export interface Order {
  id?: number;
  customerName: string;
  phoneNumber: string;
  total: number;
  items: CartItem[];
  status?: 'Pending' | 'Delivered' | 'Cancelled';
  placedAt?: Date;
}
