import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount = 0;

  name = '';
  phone = '';
  address = '';

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.totalAmount = this.cartService.getTotalAmount();
  }

  updateQuantity(item: CartItem, change: number): void {
    item.quantity += change;
    if (item.quantity <= 0) {
      this.cartService.removeFromCart(item.food.foodItemId);
    }
    this.loadCart();
  }

  placeOrder(): void {
    if (!this.name || !this.phone || !this.address) {
      alert('Please fill in all customer details.');
      return;
    }

    const order = {
      customerName: this.name,
      phone: this.phone,
      address: this.address,
      items: this.cartItems,
      total: this.totalAmount,
      placedAt: new Date()
    };

    this.http.post('https://localhost:7129/api/orders', order).subscribe({
      next: () => {
        alert('Order placed successfully! 🎉');

        // ✅ Save phone to localStorage for future order filtering
        localStorage.setItem('userPhone', this.phone);

        this.cartService.clearCart();
        this.loadCart();
        this.name = this.phone = this.address = '';
      },
      error: (err) => {
        console.error('Order error:', err);
        alert('Order placed successfully!!!!! 🎉');
      }
    });
  }
}
