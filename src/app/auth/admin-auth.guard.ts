import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      return true;
    }else {
        alert('Access denied. Admins only.');
        this.router.navigate(['/login']);  // Redirect to login if not admin
        return false;
      }
  }
}
