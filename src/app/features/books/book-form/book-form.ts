import { Component, DestroyRef, inject, signal } from '@angular/core';
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
})
export class BookForm {
  private fb = inject(FormBuilder);
  private api = inject(BooksApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isEditMode = signal(false);
  isSaving = signal(false);
  bookId: string | null = null;

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    publishedYear: [new Date().getFullYear(), [Validators.required, Validators.pattern(/^\d{4}$/)]],
    available: [true]
  });

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.isEditMode.set(true);
      this.bookForm.disable(); // Disable while loading

      this.api.getBookById(this.bookId)
      .pipe(takeUntilDestroyed(this.destroyRef)) // Safe subscription in ngOnInit
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

    const request = this.isEditMode() && this.bookId ? this.api.updateBook(this.bookId, formVal) : this.api.addBook(formVal);

    request.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.router.navigate(['/books']);
    });
  }
}
