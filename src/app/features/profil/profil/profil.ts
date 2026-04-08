import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MyPosts } from '../../../shared/components/my-posts/my-posts';
import { SNavdarHome } from '../../../core/services/s-navdar-home';
import { Iprofile } from '../../../core/models/iprofile';
import { Comments } from '../../../shared/components/comments/comments';
import { Posts } from '../../../core/services/posts/posts';
import { Ifeed } from '../../../core/models/ifeed';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NavbarHome } from '../../../shared/components/navbar/navbar-home/navbar-home';

@Component({
  selector: 'app-profil',
  imports: [Comments, RouterLink, NavbarHome],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnInit {
  private readonly sProfil = inject(SNavdarHome);
  ngOnInit(): void {
    this.getProfil();
    this.getHomeFeed();
  }

  profilList!: Iprofile;
  private readonly posts = inject(Posts);
  private readonly cor = inject(ChangeDetectorRef);
  listFeed: Ifeed[] = [];
  getProfil(): void {
    this.sProfil.getMyPorofil().subscribe({
      next: (res) => {
        this.profilList = res.data.user;
        console.log(this.profilList);
        this.cor.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isMainDivVisible: boolean = true;

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

  toggelDivs() {
    this.isMainDivVisible = !this.isMainDivVisible;
  }
}
