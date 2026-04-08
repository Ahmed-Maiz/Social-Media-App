import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SFollow } from '../../../core/services/posts/follow/s-follow';
import { IFollow } from '../../../core/models/ifollow';

@Component({
  selector: 'app-follow',
  imports: [],
  templateUrl: './follow.html',
  styleUrl: './follow.css',
})
export class Follow implements OnInit {
  private readonly sFollow = inject(SFollow);
  cor = inject(ChangeDetectorRef);

  lisFollow: IFollow[] = [];

  ngOnInit(): void {
    this.getFollows();
  }
  getFollows() {
    this.sFollow.getFollow().subscribe({
      next: (res) => {
        this.lisFollow = res.data.suggestions;
        console.log(this.lisFollow);
        this.cor.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  followFrind(id: string) {
    this.sFollow.doFollow(id).subscribe({
      next: (res) => {
        console.log('foolow', id);
        console.log(res);
        this.getFollows();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
