import { Component } from '@angular/core';
import { Content } from '../../sections/content/content';

@Component({
  selector: 'home',
  imports: [Content],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
