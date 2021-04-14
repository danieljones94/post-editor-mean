import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostListService } from '../addToPostList.service';
import { PostsService } from '../posts.service';
import { Post } from '../post.interface';

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

  constructor(
    private myPostListService: PostListService,
    private postsService: PostsService
  ) {}
  addPost(post) {
    const newPost = {
      title: post.title,
      url: post.url,
    };
    this.postsService.createPost(newPost).subscribe((data: Post) => {
      this.myPostListService.tiggerPostList(data);
    });
  }
}
