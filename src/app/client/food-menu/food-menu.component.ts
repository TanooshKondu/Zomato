import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { FoodItem } from '../../shared/models/food-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Needed for ngModel

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {
  foodItems: FoodItem[] = [];
  allItems: FoodItem[] = [];

  categories: string[] = [];
  restaurants: string[] = [];

  selectedCategory = '';
  selectedRestaurant = '';

  loading = true;
  error = '';

  constructor(private foodService: FoodService, private cartService: CartService) {}

  ngOnInit(): void {
    this.foodService.getAllFoodItems().subscribe({
      next: (items) => {
        console.log("API Response:", items);
        this.foodItems = this.allItems = items;
        this.extractFilters(items);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load food items.';
        this.loading = false;
      }
    });
  }
  

  extractFilters(items: FoodItem[]) {
    this.categories = [...new Set(items.map(f => f.category?.categoryName || ''))];
    this.restaurants = [...new Set(items.map(f => f.restaurant?.restaurantName || ''))];
  }

  applyFilters() {
    this.foodItems = this.allItems.filter(item => {
      const matchCat = this.selectedCategory ? item.category?.categoryName === this.selectedCategory : true;
      const matchRest = this.selectedRestaurant ? item.restaurant?.restaurantName === this.selectedRestaurant : true;
      return matchCat && matchRest;
    });
  }

  addToCart(food: FoodItem) {
    this.cartService.addToCart(food);
    alert(`${food.name} added to cart!`);
  }
}
