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
      'api-key': 'bc4a865c-4106-4255-904e-7a0e58e814e6',
      'Authorization': 'dec85456-73ff-40f0-8666-e20b33676d38'
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
