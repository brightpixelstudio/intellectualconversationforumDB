import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'footer',
  imports: [MenuComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
