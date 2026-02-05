import { ChangeDetectionStrategy, Component, computed, ContentChild, input, signal, TemplateRef } from '@angular/core';
import { ColumnDef } from '../../../core/models/library.model';
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

  @ContentChild('actions') actionsTemplate!: TemplateRef<any>;
  // actionsTemplate = contentChild<TemplateRef<any>>('actions');

  searchTerm = signal('');
  currentPage = signal(1);
  pageSize = signal(5);

  // Derived State: Filtered Data
  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const raw = this.data();
    console.log('Filtering data with term:', term, raw);
    if (!term) return raw;
    
    // Generic filtering on all string fields
    return raw.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
  });

  // Pagination Logic
  totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize()));
  
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    console.log('Paginating data:', { start, end, total: this.filteredData() });
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

