import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SLike {
  private readonly httpClient = inject(HttpClient);

  beasUrl = environment.beasUrl;

  putLikesUnlike(postId: any): Observable<any> {
    return this.httpClient.put(`${this.beasUrl}/posts/${postId}/like`, {});
  }

  getAllLike(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/posts/:${postId}/likes?page=1&limit=20`);
  }
}
