import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onAdminLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('https://localhost:7129/api/Auth/admin-login', credentials).subscribe({
      next: (data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('role', 'admin');
        this.router.navigate(['/admin/dashboard']); // Adjust route as per your app
      },
      error: (err) => {
        this.errorMessage = 'Invalid admin credentials';
        console.error('Admin login failed', err);
      }
    });
  }
}
