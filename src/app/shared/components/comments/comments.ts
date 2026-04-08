import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PostComments } from '../../../core/services/post-comments';
import { Icomments } from '../../../core/models/icomments';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments implements OnInit {
  private readonly postComments = inject(PostComments);

  @Input({ required: true }) postId!: any;
  @Input({ required: true }) DivVisible!: any;

  listComments: Icomments[] = [];
  listCommentss: Icomments[] = [];
  itemId!: Icomments[];

  ngOnInit(): void {
    this.Comments();
  }

  Comments() {
    this.postComments.getComments(this.postId).subscribe({
      next: (res) => {
        this.listComments = res.data.comments;
        this.listCommentss = res.data.comments;

        this.listComments = this.listComments.slice(0, 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleDivs() {
    this.DivVisible = !this.DivVisible;
  }

  commentForm: FormControl = new FormControl(null, [Validators.required]);
  createData(postId: any, e: SubmitEvent) {
    e.preventDefault();

    if (this.commentForm.valid) {
      let formData = new FormData();
      formData.append('content', this.commentForm.value);

      this.postComments.creatComment(formData, postId).subscribe({
        next: (res) => {
          // console.log(res);
          this.listCommentss.unshift(res.data.comment);
          this.listComments.unshift(res.data.comment);
          this.commentForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
