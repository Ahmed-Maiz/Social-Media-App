import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SNotifications {
  private readonly httpClient = inject(HttpClient);

  beasUrl = environment.beasUrl;

  getNotifications(un: string): Observable<any> {
    return this.httpClient.get(`${this.beasUrl}/notifications?${un}read=false&page=1&limit=10`);
  }
  getCountNotifications(): Observable<any> {
    return this.httpClient.get(`${this.beasUrl}/notifications/unread-count`);
  }
  markAllAs(): Observable<any> {
    return this.httpClient.patch(
      `${this.beasUrl}/notifications/read-all`,
      {},
      {
        headers: {
          token: localStorage.getItem('token') as string,
        },
      },
    );
  }
}
