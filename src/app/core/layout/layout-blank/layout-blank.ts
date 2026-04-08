import { Component } from '@angular/core';
import { Home } from '../../../features/home/home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-blank',
  imports: [RouterOutlet],
  templateUrl: './layout-blank.html',
  styleUrl: './layout-blank.css',
})
export class LayoutBlank {}
