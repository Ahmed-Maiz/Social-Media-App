import { Posts } from './../../../core/services/posts/posts';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthServices } from '../../../core/services/auth-services';
import { Isaved } from '../../../core/models/isaved';
import { DatePipe } from '@angular/common';
import { Modal } from 'flowbite';
import { RouterLink } from '@angular/router';
import { SLike } from '../../../core/services/like/s-like';
import { Comments } from '../comments/comments';

@Component({
  selector: 'app-saved',
  imports: [DatePipe, RouterLink, Comments],
  templateUrl: './saved.html',
  styleUrl: './saved.css',
})
export class Saved implements OnInit {
  private readonly authServices = inject(AuthServices);
  private readonly sLike = inject(SLike);
  private readonly Posts = inject(Posts);
  ngOnInit(): void {
    this.getBookMarks();
  }

  savedList: Isaved[] = [];
  isLiked: boolean = false;

  likesList: any;
  isHidden: boolean = true;
  isHiddenEdite: boolean = true;
  isMainDivVisible: boolean = true;
  toggneId!: string;
  userId!: string;
  id!: string;
  editeId!: string;
  getBookMarks(): void {
    this.authServices.getBookMorks().subscribe({
      next: (res) => {
        this.savedList = res.data.bookmarks;
        console.log(this.savedList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  bookMarkOrUnBookMark(id: string) {
    this.Posts.bookMarkOrUnBookMark(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getBookMarks();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clickLike(postId: string) {
    this.isLiked = false;
    this.sLike.putLikesUnlike(postId).subscribe({
      next: (res) => {
        this.likesList = res.data;
        console.log(this.likesList);
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
