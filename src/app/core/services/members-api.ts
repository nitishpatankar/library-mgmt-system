import { Injectable } from '@angular/core';
import { Member } from '../models/library.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersApi {
  private members: Member[] = [
    { id: '101', name: 'Alice Wonderland', email: 'alice@example.com', membershipSince: new Date('2022-01-15'), active: true },
    { id: '102', name: 'Bob Builder', email: 'bob@example.com', membershipSince: new Date('2023-05-20'), active: false },
  ];

  // Simulating network delay
  private DELAY = 500;

  getMembers(): Observable<Member[]> {
    return of([...this.members]).pipe(delay(this.DELAY));
  }
}
