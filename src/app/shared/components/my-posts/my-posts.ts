import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Comments } from '../comments/comments';
import { RouterLink } from '@angular/router';
import { Ifeed } from '../../../core/models/ifeed';
import { Posts } from '../../../core/services/posts/posts';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-my-posts',
  imports: [Comments, RouterLink, DatePipe],
  templateUrl: './my-posts.html',
  styleUrl: './my-posts.css',
})
export class MyPosts implements OnInit {
  private readonly posts = inject(Posts);
  private readonly cor = inject(ChangeDetectorRef);
  listFeed: Ifeed[] = [];
  isMainDivVisible: boolean = true;
  isHidden: boolean = true;
  toggneId!: string;
  userId!: string;
  ngOnInit(): void {
    this.getHomeFeed();

    let token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userId = decoded.user;
      } catch (error) {
        console.log(error);
      }
    }
  }
  getHomeFeed() {
    this.posts.getHomeFeed().subscribe({
      next: (res) => {
        this.listFeed = res.data.posts;
        this.cor.markForCheck();
        console.log(this.listFeed);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggelDivs(id: string) {
    this.isMainDivVisible = !this.isMainDivVisible;
    this.isHidden = !this.isHidden;
    this.toggneId = id;
  }
}
