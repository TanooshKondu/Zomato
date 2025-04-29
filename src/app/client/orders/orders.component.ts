import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userPhone = localStorage.getItem('userPhone');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7129/api/orders').subscribe({
      next: (data) => {
        // Show only orders matching logged-in user phone
        this.orders = data.filter(order => order.phone === this.userPhone);
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
      }
    });
  }
}
