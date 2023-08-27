import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts = [];
  private postsSub: Subscription;

  //'public' creates property, must be added to providers OR decorate service with Injectable from Angular Core
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
      // ,
      // () =>{
      //   //err
      // },
      // () =>{
      //   //finished
      // },
    );
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe(); //prevents memory leaks
  }
}
