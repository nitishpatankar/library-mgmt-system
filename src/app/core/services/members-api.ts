import { Injectable } from '@angular/core';
import { Member } from '../models/library.model';
import { delay, Observable, of } from 'rxjs';
import { MemberList } from '../mocks/members';

@Injectable({
  providedIn: 'root',
})
export class MembersApi {
  private members: Member[] = MemberList;

  // Simulating network delay
  private DELAY = 500;

  /**
   * GET /members
   * 
   * @returns all members
   */
  getMembers(): Observable<Member[]> {
    return of([...this.members]).pipe(delay(this.DELAY));
  }
}
