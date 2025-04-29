// src/app/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientUser } from '../../shared/models/client-user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneNumber: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === 'client') {
      this.router.navigate(['/']);
    }
    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLogin() {
    const credentials: ClientUser = {
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.authService.clientLogin(credentials).subscribe({
      next: (data) => {
        localStorage.setItem('role', 'client');
        localStorage.setItem('clientPhone', this.phoneNumber);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid login credentials';
        console.error('Login failed', err);
      }
    });
  }
}
