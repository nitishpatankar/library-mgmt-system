import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/library.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal to hold current user state
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    // Check sessionStorage on init for persistence
    const saved = sessionStorage.getItem('user');
    if (saved) {
      this.currentUser.set(JSON.parse(saved));
    }
  }

  login(email: string): void {
    const user: User = { email, name: 'Admin User' };
    this.currentUser.set(user);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/books']);
  }

  logout(): void {
    this.currentUser.set(null);
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
