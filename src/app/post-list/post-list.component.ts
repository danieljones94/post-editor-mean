import { Component } from '@angular/core';
import { PostListService } from '../addToPostList.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  postList;
  post: any = { title: '', url: '', votes: 0 };
  constructor(public myPostListService: PostListService) {
    this.postList = [
      {
        _id: 1,
        title: 'The First Post Title',
        url: 'http://google.co.uk/',
        votes: 85,
      },
      {
        _id: 2,
        title: 'The Second Post Title',
        url: 'http://facebook.com/',
        votes: 11,
      },
      {
        _id: 3,
        title: 'The third Post Title',
        url: 'http://youtube.com/',
        votes: 36,
      },
      {
        _id: 4,
        title: 'The fourth Post Title',
        url: 'http://twitter.com/',
        votes: 5,
      },
    ];
    this.myPostListService.postList$.pipe().subscribe((response) => {
      this.post = { title: response.title, url: response.url, votes: 0 };
      if (response) {
        this.postList.push(this.post);
      }
    });
    this.sortPosts(this.postList);
  }

  downVote(post: any) {
    let selectedPost = this.postList.find((item) => post._id === item._id);
    selectedPost.votes = selectedPost.votes - 1;
    this.sortPosts(this.postList);
  }

  upVote(post: any) {
    let selectedPost = this.postList.find((item) => post._id === item._id);
    selectedPost.votes = selectedPost.votes + 1;
    this.sortPosts(this.postList);
  }

  deletePost(post: any) {
    this.postList.forEach((item, index) => {
      if (item._id == post._id) {
        this.postList.splice(index, 1);
      }
    });
  }

  sortPosts(postList) {
    return postList.sort((a, b) => (a.votes < b.votes ? 1 : -1));
  }
}
