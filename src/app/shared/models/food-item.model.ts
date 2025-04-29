import { Category } from './category.model';
import { Restaurant } from './restaurant.model';

export interface FoodItem {
  foodItemId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  restaurantId: number;

  category?: Category; // Optional relationship to Category model
  restaurant?: Restaurant; // Optional relationship to Restaurant model
}
