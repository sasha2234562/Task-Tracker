import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map, Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

export interface Res {
  addedDate: string
  id: string
  order: number
  title: string
}

export interface RootObject {
  data: {
    item: Res;
  },
  messages: any[];
  fieldsErrors: any[];
  resultCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  url = 'https://social-network.samuraijs.com/api/1.1/todo-lists'

  todos$: BehaviorSubject<Res[]> = new BehaviorSubject<Res[]>([])

  httpOptions = {
    headers: {
      'api-key': '50659ead-1a5f-4716-a050-11b2b876ac95',
      'Authorization': '3d31f7f8-0cd0-43b5-b75e-cd36b5579564'
    },
    withCredentials: true
  }

  getTodo(): Observable<Res[]> {
    this.http.get<Res[]>(this.url, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.message)
        return EMPTY
      })
    ).subscribe(todo => {
      this.todos$.next(todo)
    })
    return this.http.get<Res[]>(this.url)
  }

  deleteTodo(id: string) {
    this.http.delete<RootObject>(`${this.url}/${id}`, this.httpOptions).pipe(map(() => {
      return this.todos$.getValue().filter(t => t.id !== id)
    })).subscribe((res) => {
      this.todos$.next(res)
    })
  }
}
