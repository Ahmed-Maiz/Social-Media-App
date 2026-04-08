import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SFollow {
  private readonly httpClient = inject(HttpClient);

  getFollow(): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/users/suggestions?limit=10`);
  }
  doFollow(followId: string): Observable<any> {
    return this.httpClient.put(`${environment.beasUrl}/users/${followId}/follow`, null);
  }
}
