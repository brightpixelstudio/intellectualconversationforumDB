import { Component } from '@angular/core';
import { NewComment } from '../../sections/newcomment/newcomment';

@Component({
  selector: 'newcommentpage',
  imports: [NewComment],
  templateUrl: './newcommentpage.html',
  styleUrl: './newcommentpage.css',
})
export class NewCommentPage {}
