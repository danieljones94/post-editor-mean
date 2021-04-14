import { Component, OnInit } from '@angular/core';
import { PostListService } from '../addToPostList.service';
import { PostsService } from '../posts.service';
import { Post } from '../post.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postList;
  post = { title: '', url: '', votes: 0 };

  pushPostIntoPostList(post) {
    this.postList.push(post);
  }
  constructor(
    public myPostListService: PostListService,
    private postsService: PostsService
  ) {
    this.myPostListService.postList$.pipe().subscribe((response) => {
      this.post = {
        title: response.title,
        url: response.url,
        votes: response.votes,
      };
      if (response) {
        console.log(this.post);
        if (typeof this.postList !== 'undefined') {
          this.pushPostIntoPostList(this.post);
        }
      }
    });
  }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe((data: Post[]) => {
      console.log(data);
      this.postList = data;
    });
  }
  sortPosts() {
    return this.postList.sort((a, b) => (a.votes < b.votes ? 1 : -1));
  }

  downVote(post: Post) {
    const selectedPost = this.postList.find((itm) => post._id === itm._id);
    selectedPost.votes = selectedPost.votes - 1;
    this.postsService.upVote(post._id, post.votes).subscribe((data: Post) => {
      // console.log(data);
    });
    this.sortPosts();
  }

  upVote(post: Post) {
    const selectedPost = this.postList.find((itm) => post._id === itm._id);
    selectedPost.votes = selectedPost.votes + 1;
    this.postsService.downVote(post._id, post.votes).subscribe((data: Post) => {
      // console.log(data);
    });
    this.sortPosts();
  }

  deletePost(post: Post) {
    this.postsService.deletePost(post._id).subscribe((data: Post) => {
      alert(`${post.title} deleted`);
    });
    const index = this.postList.indexOf(post);
    this.postList.splice(index, 1);
  }
}
