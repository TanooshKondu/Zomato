import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../shared/models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'https://localhost:7129/api/FoodItems';

  constructor(private http: HttpClient) {}

  getAllFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.apiUrl);
  }

  getFoodItemsByCategory(categoryId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.apiUrl}/bycategory/${categoryId}`);
  }

  getFoodItemsByRestaurant(restaurantId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.apiUrl}/byrestaurant/${restaurantId}`);
  }

  addFoodItem(item: FoodItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  deleteFoodItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateFoodItem(id: number, item: FoodItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }
}
