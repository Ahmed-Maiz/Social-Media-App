import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Ifeed } from '../../../../core/models/ifeed';
import { Posts } from '../../../../core/services/posts/posts';
import { Comments } from '../../comments/comments';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { NavbarHome } from '../../navbar/navbar-home/navbar-home';

@Component({
  selector: 'app-feed',
  imports: [Comments, RouterLink, DatePipe, NavbarHome],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  private readonly posts = inject(Posts);
  private readonly cor = inject(ChangeDetectorRef);
  listFeed: Ifeed[] = [];
  isMainDivVisible: boolean = true;
  toggneId!: string;
  isHidden: boolean = true;
  userId: any = '';

  ngOnInit(): void {
    this.getHomeFeed();
    let token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        // السطر ده هو اللي هيحل المشكلة بناءً على الأوبجكت بتاعك
        this.userId = decoded.user;

        console.log('User ID is:', this.userId); // هيطبع: 69d128bd40873fb7bdfeb659
      } catch (error) {
        console.error('Invalid Token', error);
      }
    }
  }
  getHomeFeed() {
    this.posts.getHomeFeed().subscribe({
      next: (res) => {
        this.listFeed = res.data.posts;

        console.log(this.listFeed);
        this.cor.markForCheck();
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
    console.log(this.userId);
  }
}
