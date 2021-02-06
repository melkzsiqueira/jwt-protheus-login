import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import LoadSpinner from '../../models/loadSpinner';

@Injectable({
  providedIn: 'root'
})
export class LoadSpinnerService {

  private isActiveSubject: BehaviorSubject<LoadSpinner>;
  public isActive: Observable<LoadSpinner>;

  constructor() { 
    this.isActiveSubject = new BehaviorSubject<LoadSpinner>({ message: '', load: false });
    this.isActive = this.isActiveSubject.asObservable();
   }

   active({ message, load }: LoadSpinner): void {
     this.isActiveSubject.next({
       message, 
       load
      });
   }
}
