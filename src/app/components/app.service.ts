import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Res, RootObject} from "./todos/todo/todo.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  url = 'https://social-network.samuraijs.com/api/1.1/todo-lists'
  todos$: BehaviorSubject<Res[]> = new BehaviorSubject<Res[]>([])
  httpOptions = {
    headers: {
      'api-key': '50659ead-1a5f-4716-a050-11b2b876ac95',
      'Authorization': '3d31f7f8-0cd0-43b5-b75e-cd36b5579564'
    },
    withCredentials: true
  }
  addTodo(title: string){
    this.http.post<RootObject>(this.url, {title}, this.httpOptions).pipe(map(res => {
      return [...this.todos$.getValue(), res.data.item]
    })).subscribe(res => {
      this.todos$.next(res)
    })
  }
}
