import { Component } from '@angular/core';
import { PostListService } from '../addToPostList.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  postList;
  post = { title: '', url: '', votes: 0 };
  constructor(public myPostListService: PostListService) {
    this.postList = [
      {
        _id: 1,
        title: 'The First Post Title',
        url: 'http://google.co.in/',
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
  }

  downVote(post) {
    console.log('Post downvoted');
  }

  upVote(post) {
    console.log('Post has beeen upvoted');
  }
}
