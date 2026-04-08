import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/posts`);
  }

  createPostes(data: FormData): Observable<any> {
    return this.httpClient.post(`${environment.beasUrl}/posts`, data);
  }

  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/posts/${postId}`);
  }
  sharePost(postId: string, body: any): Observable<any> {
    return this.httpClient.post(`${environment.beasUrl}/posts/${postId}/share`, body);
  }
  getHomeFeed(): Observable<any> {
    return this.httpClient.get(`${environment.beasUrl}/posts/feed?only=following&limit=10`);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`${environment.beasUrl}/posts/${postId}`);
  }

  editPost(postId: string, body: object): Observable<any> {
    return this.httpClient.put(`${environment.beasUrl}/posts/${postId}`, body);
  }

  bookMarkOrUnBookMark(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.beasUrl}/posts/${postId}/bookmark`, null);
  }
}
