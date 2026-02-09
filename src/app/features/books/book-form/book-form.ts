import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksApi } from '../../../core/services/books-api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookForm implements OnInit {
  private _fb = inject(FormBuilder);
  private _bookService = inject(BooksApi);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  isEditMode = signal(false);
  isSaving = signal(false);
  bookId: string | null = null;

  bookForm = this._fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    publishedYear: [new Date().getFullYear(), [Validators.required, Validators.pattern(/^\d{4}$/)]],
    available: [true]
  });

  ngOnInit() {
    this.bookId = this._route.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.isEditMode.set(true);
      this.bookForm.disable(); // Disable while loading

      this._bookService.getBookById(this.bookId)
      .pipe(takeUntilDestroyed(this._destroyRef)) // auto-unsubscribe on destroy
      .subscribe(book => {
        if (book) {
          this.bookForm.patchValue(book);
          this.bookForm.enable();
        }
      });
    }
  }

  save() {
    if (this.bookForm.invalid) return;

    this.isSaving.set(true);
    const formVal = this.bookForm.value as any;

    const request = this.isEditMode() && this.bookId ? this._bookService.updateBook(this.bookId, formVal) : this._bookService.addBook(formVal);

    request.pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe(() => {
      this._router.navigate(['/books']);
    });
  }
}
