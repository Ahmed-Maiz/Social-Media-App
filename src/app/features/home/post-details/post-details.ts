import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Posts } from '../../../core/services/posts/posts';
import { IPosts } from '../../../core/models/iposts';
import { Comments } from '../../../shared/components/comments/comments';
import { SinglPost } from '../../../shared/components/singl-post/singl-post';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails implements OnInit {
  private readonly postDetails = inject(ActivatedRoute);
  private readonly cor = inject(ChangeDetectorRef);
  private readonly posts = inject(Posts);

  postId!: string | null;
  post!: IPosts;
  isFlag: boolean = true;
  ngOnInit(): void {
    this.getId();
  }

  getId() {
    this.postDetails.paramMap.subscribe((urlPath) => {
      this.postId = urlPath.get('id');
      console.log(this.postId);

      this.getSinglPost();
    });
  }

  getSinglPost() {
    this.posts.getSinglePost(this.postId).subscribe({
      next: (res) => {
        this.post = res.data.post;
        this.isFlag = false;
        this.cor.detectChanges();
        console.log(this.post);
      },
      error: (err) => {
        console.log(err);
        this.isFlag = false;
      },
    });
  }
}
