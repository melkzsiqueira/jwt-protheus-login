import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification/notification.service';

import Notification from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  isActive: Notification = { active: false };

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.isActive.subscribe(isActive => {
      this.isActive = isActive;
    });
  }

}
