import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Grid } from '../../../shared/components/grid/grid';
import { MembersApi } from '../../../core/services/members-api';
import { ColumnDef, Member } from '../../../core/models/library.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-member-list',
  imports: [Grid],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private _memberService = inject(MembersApi);
  private _destroyRef = inject(DestroyRef);

  members = signal<Member[]>([]);
  loading = signal(true);

  tableCols: ColumnDef[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'membershipSince', header: 'Joined', type: 'date' },
  ];

  ngOnInit() {
    this._memberService.getMembers()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((data: Member[]) => {
      this.members.set(data);
      this.loading.set(false);
    });
  }
}
