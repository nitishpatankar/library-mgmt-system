import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BooksApi } from '../../../core/services/books-api';
import { Router, RouterLink } from '@angular/router';
import { Book, ColumnDef } from '../../../core/models/library.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatusHighlightDirective } from '../../../shared/directives/status-highlight';
import { Grid } from '../../../shared/components/grid/grid';

@Component({
  selector: 'app-book-list',
  imports: [Grid, RouterLink, StatusHighlightDirective],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookList implements OnInit {
  private api = inject(BooksApi);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  books = signal<Book[]>([]);
  loading = signal(true);

  tableCols: ColumnDef[] = [
    { key: 'title', header: 'Title' },
    { key: 'author', header: 'Author' },
    { key: 'category', header: 'Category' },
    { key: 'publishedYear', header: 'Year' }
  ];

  ngOnInit() {
    // Auto-unsubscribe pattern using takeUntilDestroyed
    this.api.getBooks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (books: Book[]) => {
          console.log('Fetched books:', books);
          this.books.set(books);
          this.loading.set(false);
        }
      });
  }

  editBook(id: string) {
    this.router.navigate(['/books', id]);
  }
}
