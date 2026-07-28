import { Injectable } from '@angular/core';

// Note: this service is NOT providedIn: 'root'. It is provided at the
// component level in NotificationComponent instead, so each component
// instance (and its children) gets its own isolated instance.
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  getAll(): string[] {
    return this.messages;
  }
}
