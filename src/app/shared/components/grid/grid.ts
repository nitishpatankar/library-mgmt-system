import { ChangeDetectionStrategy, Component, computed, ContentChild, contentChild, Input, input, signal, TemplateRef } from '@angular/core';
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
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) columns: ColumnDef[] = [];
  @Input() isLoading = false;

  // data = input.required<any[]>();
  // columns = input.required<ColumnDef[]>();
  // isLoading = input<boolean>(false);

  // To allow parent to inject specific action buttons (Edit/Delete)
  @ContentChild('actions') actionsTemplate!: TemplateRef<any>;
  // actionsTemplate = contentChild<TemplateRef<any>>('actions');

  // Signals for local table state
  searchTerm = signal('');
  currentPage = signal(1);
  pageSize = signal(5);

  // Derived State: Filtered Data
  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const raw = this.data;
    if (!term) return raw;
    
    // Generic filtering on all string fields
    return raw.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
  });

  // Derived State: Pagination Logic
  totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize()));
  
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    console.log('Paginating data:', { start, end, total: this.filteredData() });
    return this.filteredData().slice(start, end);
  });

  updateSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1); // Reset to page 1 on search
  }

  updatePageSize(size: number) {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  previusPage() {
    if (this.currentPage() > 1)
      this.currentPage.update(p => p - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }
}

