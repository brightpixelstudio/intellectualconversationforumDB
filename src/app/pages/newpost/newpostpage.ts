import { Component } from '@angular/core';
import { NewPost } from '../../sections/newpost/newpost';

@Component({
  selector: 'newpostpage',
  imports: [NewPost],
  templateUrl: './newpostpage.html',
  styleUrl: './newpostpage.css',
})
export class NewPostPage {}
