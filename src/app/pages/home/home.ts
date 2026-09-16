import { Component } from '@angular/core';
import { Registration } from '../../sections/registration/registration';

@Component({
  selector: 'home',
  imports: [Registration],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
