import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostComments {
  private readonly httpClient = inject(HttpClient);

  getComments(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/posts/${postId}/comments?page=1&limit=10`);
  }

  creatComment(data: any, postId: any): Observable<any> {
    return this.httpClient.post(`${environment.beasUrl}/posts/${postId}/comments`, data);
  }
}
