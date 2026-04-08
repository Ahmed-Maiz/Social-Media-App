import { jwtDecode } from 'jwt-decode';
import { NavbarHome } from '../../shared/components/navbar/navbar-home/navbar-home';
import { CreatPosts } from '../../shared/components/creat-posts/creat-posts';
import { SinglPost } from '../../shared/components/singl-post/singl-post';

import { Follow } from '../../shared/components/follow/follow';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NavbarHome, CreatPosts, Follow, RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  ngOnInit(): void {
    this.tokenIsLogal();
  }

  tokenIsLogal() {
    let token = localStorage.getItem('token');
    if (token) {
      let decoded = jwtDecode(token);
      console.log(decoded);
    }
  }
}
