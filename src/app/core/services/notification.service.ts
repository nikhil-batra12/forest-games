import { Message } from './../models/message.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: Message;

  messagesSource = new BehaviorSubject<Message>(this.message);
  messages$ = this.messagesSource.asObservable();

  constructor() { }

  private displayMessage(message: Message) {
    this.message = message;
    this.messagesSource.next(this.message);
  }

  removeMessage() {
    this.message = null;
    this.messagesSource.next(this.message);
  }

  displayInfo(message: Message) {
    message.type = 'info';
    this.displayMessage(message);
  }

  displayError(message: Message) {
    message.type = 'error';
    this.displayMessage(message);
  }

  displaySuccess(message: Message) {
    message.type = 'success';
    this.displayMessage(message);
  }
}
