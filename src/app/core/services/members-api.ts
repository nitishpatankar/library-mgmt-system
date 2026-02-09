import { Injectable } from '@angular/core';
import { Member } from '../models/library.model';
import { delay, Observable, of } from 'rxjs';
import { MemberList } from '../mocks/members';

@Injectable({
  providedIn: 'root',
})
export class MembersApi {
  private members: Member[] = MemberList;

  /**
   * GET /members
   * 
   * @returns all members
   */
  getMembers(): Observable<Member[]> {
    return of([...this.members]);
  }
}
