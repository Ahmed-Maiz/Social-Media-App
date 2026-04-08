import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { SNotifications } from '../../../core/services/notifications/s-notifications';
import { INotirications } from './i-notirications';
import { NavbarHome } from '../../../shared/components/navbar/navbar-home/navbar-home';

@Component({
  selector: 'app-notifications',
  imports: [NgClass, DatePipe, NavbarHome],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  private readonly sNotifications = inject(SNotifications);
  private readonly cor = inject(ChangeDetectorRef);
  isAllActive: boolean = true;
  ngOnInit(): void {
    this.getNotification('', true);
  }

  // استخدام Signal لتخزين قائمة الإشعارات
  notifications: INotirications[] = [];

  getNotification(un: string, status: boolean) {
    this.sNotifications.getNotifications(un).subscribe({
      next: (res) => {
        this.notifications = res.data.notifications;
        this.isAllActive = status;
        console.log(this.notifications);
        this.cor.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  markeAll() {
    this.sNotifications.markAllAs().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
