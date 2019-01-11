import { Subscription } from 'rxjs';
import { Message } from './../../models/message.model';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private messagesSubscription: Subscription;
  message: Message;
  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.messagesSubscription = this.notificationService.messages$.subscribe((message: Message) => {
      this.message = message;
      if (message) {
        setTimeout(() => {
          this.dismissMessage();
        }, 5000);
      }
    });
  }

  dismissMessage() {
    this.notificationService.removeMessage();
  }

}
