import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';
import { NavbarHome } from './shared/components/navbar/navbar-home/navbar-home';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, NavbarHome, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Social-Media');

  titles = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
