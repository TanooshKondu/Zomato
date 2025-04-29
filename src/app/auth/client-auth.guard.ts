import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'client') {
      return true;
    }

    else {
        alert('Access denied. Please login as a client.');
        this.router.navigate(['/login']);
        return false;
      }
  }
}
