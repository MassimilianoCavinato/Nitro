import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  public loaded: boolean = false;
  public group_type: string = "week_date";
  public posts: any[] = [];
  public editing_post_id: number|null = null;
  public edit_author: string = "";
  public edit_location: string = "";
  public tree: any[];

  constructor( private _api: ApiService ) { }

  ngOnInit(): void {
    this._api.getPosts().subscribe(
      response => {
        this.posts = response.data.map(post => {
          let week_date = this.getWeekDateFromUnixTimestamp(post.time);
          return Object.assign({}, post, {
            "week_date": week_date
          } );
        });
        this.setTree();
      },
      error => {
        console.log(error);     
      }
    );
  }

  getWeekDateFromUnixTimestamp(unix_string: string) : string {
    let unix_ms = parseInt(unix_string) * 1000;
    let date = new Date(unix_ms); 
    //"2019 - Week 11"
    let week_date = moment(date).year().toString() + " - Week "+  moment(date).week().toString();
    return week_date;
  }

  setTree() : void {
    
    let tree = {};

    this.posts.forEach(post => {
      let group_name = post[this.group_type];
      if(!tree.hasOwnProperty(group_name)){
        tree[group_name] = {
          name: group_name,
          children: [],
          open: false
        }
      }
      tree[group_name].children.push(post);
    });

    let tree_array = Object.values(tree);
    this.tree = tree_array;
  }

  toggleGroup(node_index: number): void{
    this.tree[node_index].open = !this.tree[node_index].open;
  }

  onEditPost(id: number) : void{
    let post = this.posts.find(post => post.id === id);
    if(typeof post != 'undefined'){
      this.editing_post_id = id;
      this.edit_author = post.author;
      this.edit_location = post.location;
    }
    else{
      this.onCancelEditPost();
    }
  }

  onCancelEditPost() : void {
    this.editing_post_id = null;
  }

  onSubmitEditPost() : void {
    this.posts = this.posts.map(post => {
      return post.id === this.editing_post_id ? Object.assign({}, post, { author: this.edit_author , location: this.edit_location }) : post;
    });
    this.onCancelEditPost();
    this.setTree();
  }
}
