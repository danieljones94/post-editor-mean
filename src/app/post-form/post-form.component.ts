import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostListService } from '../addToPostList.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  post = {
    title: '',
    url: '',
  };

  constructor(public myPostListService: PostListService) {}
  @Output() clicked = new EventEmitter();
  addPost(data) {
    this.myPostListService.tiggerPostList(data);
  }
}
