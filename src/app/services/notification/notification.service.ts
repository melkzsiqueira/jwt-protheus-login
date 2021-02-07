import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import Notification from '../../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private isActiveSubject: BehaviorSubject<Notification>;
  public isActive: Observable<Notification>;

  constructor() { 
    this.isActiveSubject = new BehaviorSubject<Notification>({ active: false });
    this.isActive = this.isActiveSubject.asObservable();
  }

  active({ message, active }: Notification): void {
    this.isActiveSubject.next({
      message,
      active
    });
  }

}
