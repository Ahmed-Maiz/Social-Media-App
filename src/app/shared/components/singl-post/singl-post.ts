import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  model,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { IPosts } from '../../../core/models/iposts';
import { Comments } from '../comments/comments';
import { RouterLink } from '@angular/router';
import { Posts } from '../../../core/services/posts/posts';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { SLike } from '../../../core/services/like/s-like';
import { Modal } from 'flowbite';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-singl-post',
  imports: [Comments, RouterLink, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './singl-post.html',
  styleUrl: './singl-post.css',
})
export class SinglPost implements OnInit {
  ngOnInit(): void {
    this.tokenIsLogal();
    this.getAllPost();
    this.tokenIsLogal();
  }
  private readonly posts = inject(Posts);
  private readonly cor = inject(ChangeDetectorRef);
  private readonly slike = inject(SLike);
  myDiv = viewChild<ElementRef<HTMLDivElement>>('Div');

  isLiked: boolean = false;
  postsList: IPosts[] = [];
  likesList: any;
  isHidden: boolean = true;
  isHiddenEdite: boolean = true;
  isMainDivVisible: boolean = true;
  toggneId!: string;
  userId!: string;
  id!: string;
  editeId!: string;
  body: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(300)]);
  tokenIsLogal() {
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

  getAllPost() {
    this.posts.getAllPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postsList = res.data.posts;
          this.id = res.data.posts;
          console.log(this.postsList);
          this.cor.markForCheck();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clickLike(postId: string) {
    this.isLiked = false;
    this.slike.putLikesUnlike(postId).subscribe({
      next: (res) => {
        this.likesList = res.data;
        console.log(this.likesList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sharePost(id: string, e: Event) {
    e.preventDefault();
    // console.log(id, this.body.value);
    let objckt;

    if (this.body.value == '') {
      objckt = {};
    } else {
      objckt = {
        body: this.body.value,
      };
    }

    this.posts.sharePost(id, objckt).subscribe({
      next: (res) => {
        console.log(res, this.body);
        this.getAllPost();
        this.modal.hide();
      },
      error: (err) => {
        console.log(err);
        this.modal.hide();
      },
    });
  }

  deletePost(id: string) {
    this.posts.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isHidden = false;
        this.getAllPost();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editePost(editeId: string) {
    let objcet;
    if (this.body.value == '') {
      objcet = {};
    } else {
      objcet = {
        body: this.body.value,
      };
    }
    this.posts.editPost(editeId, objcet).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPost();
      },
      error: (err) => {
        console.log(err, objcet, editeId);
      },
    });
  }

  bookMarkOrUnBookMark(id: string) {
    this.posts.bookMarkOrUnBookMark(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPost();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  editeToggel(id: string) {
    this.editeId = id;
    this.modal.show();
    this.isHidden = true;
    this.isHiddenEdite = false;
  }
  toggelDivs() {
    this.isMainDivVisible = !this.isMainDivVisible;
  }

  toggel(id: string) {
    this.isHidden = !this.isHidden;
    this.toggneId = id;
  }

  @ViewChild('modal') modalElement!: ElementRef;
  private modal!: Modal;
  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }
  openModal(id: string) {
    this.id = id;
    this.modal.show();
    this.isHidden = false;
    this.isHiddenEdite = true;
  }
  closModal() {
    this.modal.hide();
  }
}
