import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  breadCrumbArray = [];
  crumbSource = new BehaviorSubject<any>([]);
  crumb$ = this.crumbSource.asObservable();

  constructor() { }

  setBreadCrumb(data) {
    this.breadCrumbArray = data;
    this.crumbSource.next(this.breadCrumbArray);
  }

  getBreadCrumb() {
    return this.breadCrumbArray;
  }
}

