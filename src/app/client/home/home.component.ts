// src/app/client/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { FoodItem } from '../../shared/models/food-item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodItems: FoodItem[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.getFoodItems();
  }

  // Fetch food items from the service
  getFoodItems(): void {
    this.foodService.getAllFoodItems().subscribe({
      next: (data) => {
        this.foodItems = data;
      },
      error: (err) => {
        console.error('Error fetching food items', err);
      }
    });
  }

  // Add food item to cart
  addToCart(foodItem: FoodItem): void {
    // Implement the logic for adding the item to the cart
    console.log(`Adding ${foodItem.name} to the cart!`);
    // You can use a cart service to manage cart items
  }
}
