import { Injectable } from '@angular/core';
import Axios from 'axios-observable';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  private _api = Axios.create({
    baseURL: "http://localhost:4300/",
    timeout: 1000,
  });

  constructor(  ) { }

  getPosts(){
    return this._api.get('posts');
  }

}
