import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth)
  },
  { 
    path: 'books',
    canActivate: [authGuard],
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/books/book-list/book-list').then(m => m.BookList)
      },
    ]
  },
];