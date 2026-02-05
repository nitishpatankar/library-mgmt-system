import { Injectable } from '@angular/core';
import { Book } from '../models/library.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksApi {
  // In-memory data
  private books: Book[] = [
    { id: '1', title: 'The Angular Way', author: 'John Doe', category: 'Tech', publishedYear: 2024, available: true },
    { id: '2', title: 'Signals Deep Dive', author: 'Jane Smith', category: 'Tech', publishedYear: 2023, available: false },
    { id: '3', title: 'Clean Code', author: 'Uncle Bob', category: 'Software', publishedYear: 2008, available: true },
    { id: '4', title: 'Design Patterns', author: 'Gang of Four', category: 'Software', publishedYear: 1994, available: true },
    { id: '5', title: 'Refactoring', author: 'Martin Fowler', category: 'Software', publishedYear: 1999, available: false },
    { id: '6', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software', publishedYear: 1999, available: true },
  ];

  // network delay
  private DELAY = 500;

  getBooks(): Observable<Book[]> {
    return of([...this.books]).pipe(delay(this.DELAY));
  }

  getBookById(id: string): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book ? { ...book } : undefined).pipe(delay(this.DELAY));
  }

  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    const newBook = { ...book, id: Math.random().toString(36).substring(7) };
    this.books = [newBook, ...this.books];
    return of(newBook).pipe(delay(this.DELAY));
  }

  updateBook(id: string, changes: Partial<Book>): Observable<Book> {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...changes };
      return of(this.books[index]).pipe(delay(this.DELAY));
    }
    throw new Error('Book not found');
  }
}
