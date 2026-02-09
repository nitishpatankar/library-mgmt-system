import { ChangeDetectionStrategy, Component, computed, contentChild, ContentChild, input, signal, TemplateRef } from '@angular/core';
import { Book, ColumnDef, Member } from '../../../core/models/library.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid',
  imports: [CommonModule, FormsModule],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Grid {
  data = input.required<any[]>();
  columns = input.required<ColumnDef[]>();
  isLoading = input<boolean>(false);

  actionsTemplate = contentChild<TemplateRef<any>>('actions');

  searchTerm = signal('');
  currentPage = signal(1);
  pageSize = signal(5);

  /**
   * Filters the input data based on the search term. It checks specified columns for matches and returns the filtered array.
   * If the search term is empty, it returns the original data.
   */
  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const raw = this.data();
    const searchColumns: (keyof Book | keyof Member )[] = ['title', 'author', 'name', 'email'];

    if (!term) return raw;

    return raw.filter(item => 
      searchColumns.some(key => 
        String(item[key]).toLowerCase().includes(term)
      )
    );
  });

  // Pagination Logic
  totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize()));
  
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredData().slice(start, end);
  });

  updateSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  updatePageSize(size: number) {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  previousPage() {
    if (this.currentPage() > 1)
      this.currentPage.update(p => p - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }
}

