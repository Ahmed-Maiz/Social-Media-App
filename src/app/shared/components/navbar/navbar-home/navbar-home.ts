import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { IPosts } from '../../../../core/models/iposts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { SNavdarHome } from '../../../../core/services/s-navdar-home';
import { Iprofile } from '../../../../core/models/iprofile';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-home',
  imports: [RouterLink],
  templateUrl: './navbar-home.html',
  styleUrl: './navbar-home.css',
})
export class NavbarHome implements OnInit {
  private readonly sNavdarHome = inject(SNavdarHome);
  private readonly cor = inject(ChangeDetectorRef);
  isHidden: boolean = true;
  routr = inject(Router);
  listPorofil!: Iprofile;

  ngOnInit(): void {
    this.getMyPorofil();
  }
  getMyPorofil() {
    this.sNavdarHome.getMyPorofil().subscribe({
      next: (res) => {
        this.listPorofil = res.data.user;
        this.cor.markForCheck();
        console.log(this.listPorofil);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.routr.navigate(['/login']);
  }
  toggen() {
    this.isHidden = !this.isHidden;
  }
}
