import { FoodItem } from './food-item.model';

export interface CartItem {
  food: FoodItem;
  quantity: number;
}
