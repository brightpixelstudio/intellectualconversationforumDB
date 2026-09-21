import { Component } from '@angular/core';
import { Posts } from '../../sections/posts/posts';

@Component({
  selector: 'postspage',
  imports: [Posts],
  templateUrl: './postspage.html',
  styleUrl: './postspage.css',
})
export class PostsPage {}
