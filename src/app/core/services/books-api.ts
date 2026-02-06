import { Injectable } from '@angular/core';
import { Book } from '../models/library.model';
import { delay, Observable, of } from 'rxjs';
import { BookList } from '../mocks/books';

@Injectable({
  providedIn: 'root',
})
export class BooksApi {
  private books: Book[] = BookList;

  /**
   * GET /books
   * @returns books
   */
  getBooks(): Observable<Book[]> {
    return of([...this.books]);
  }

  /**
   * GET /books/:id
   * 
   * @param id string
   * @returns books
   */
  getBookById(id: string): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book ? { ...book } : undefined);
  }

  /**
   * ADD /books
   * 
   * @param book string
   * @returns newly added book details in table
   */
  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    const newBook = { ...book, id: Math.random().toString(36).substring(7) };
    this.books = [newBook, ...this.books];
    return of(newBook);
  }

  /**
   * EDIT /books/:id
   * 
   * @param id string
   * @param changes book
   * @returns updated book details in table
   */
  updateBook(id: string, changes: Partial<Book>): Observable<Book> {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...changes };
      return of(this.books[index]);
    }
    throw new Error('Book not found');
  }
}
