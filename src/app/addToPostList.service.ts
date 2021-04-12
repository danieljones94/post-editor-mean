import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostListService {
  public postList = new BehaviorSubject<any>({});
  public postList$ = this.postList.asObservable();

  tiggerPostList(data) {
    this.postList.next(data);
  }
}
