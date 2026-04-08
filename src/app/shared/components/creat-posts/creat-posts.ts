import { Posts } from './../../../core/services/posts/posts';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SNavdarHome } from '../../../core/services/s-navdar-home';
import { Iprofile } from '../../../core/models/iprofile';

@Component({
  selector: 'app-creat-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './creat-posts.html',
  styleUrl: './creat-posts.css',
})
export class CreatPosts implements OnInit {
  ngOnInit(): void {
    this.getporofil();
    // this.creatPost();
  }
  private readonly posts = inject(Posts);
  private readonly sProfil = inject(SNavdarHome);
  cor = inject(ChangeDetectorRef);
  uploadFile: any;
  profilList!: Iprofile;
  postDiscribtion: FormControl = new FormControl(null, [Validators.required]);

  setFileImg(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input) {
      if (input.files) {
        this.uploadFile = input.files[0];
      }
    }
  }

  creatPost(e: SubmitEvent) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('body', this.postDiscribtion.value);
    formData.append('image', this.uploadFile);

    this.posts.createPostes(formData).subscribe({
      next: (res) => {
        this.cor.markForCheck();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getporofil() {
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
}
