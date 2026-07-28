import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  // Component-level provider: this creates a NEW NotificationService
  // instance scoped to this component (and its children), separate from
  // any other instance elsewhere in the app - useful when notifications
  // should not leak state between independent widgets.
  providers: [NotificationService],
  template: `
    <div class="spinner" *ngIf="loading.isLoading$ | async">Loading...</div>
  `,
  styles: [
    `
      .spinner {
        padding: 0.4rem 0.8rem;
        background: #fff3cd;
        border: 1px solid #ffe58f;
        border-radius: 4px;
        display: inline-block;
      }
    `,
  ],
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  loading = inject(LoadingService);
}
