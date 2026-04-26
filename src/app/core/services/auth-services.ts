import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private readonly httpClient = inject(HttpClient);

  sayUp(data: any): Observable<any> {
    return this.httpClient.post(`${environment.beasUrl}/users/signup`, data);
  }

  saylogin(data: any): Observable<any> {
    return this.httpClient.post(`${environment.beasUrl}/users/signin`, data);
  }

  getBookMorks(): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/users/bookmarks`);
  }

  changPassowrd(body: object): Observable<any> {
    return this.httpClient.patch(`${environment.beasUrl}/users/change-password`, body);
  }
}
