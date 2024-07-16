import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Res} from "../../todo/todo.service";

export interface Task {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: string
  deadline: string
  addedDate: string
  completed: boolean
}

export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  url = 'https://social-network.samuraijs.com/api/1.1/todo-lists'

  todos$: BehaviorSubject<Res[]> = new BehaviorSubject<Res[]>([])
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])

  httpOptions = {
    headers: {
      'api-key': 'bc4a865c-4106-4255-904e-7a0e58e814e6',
      'Authorization': 'dec85456-73ff-40f0-8666-e20b33676d38'
    },
    withCredentials: true
  }

  getTask(todolistId: string) {
    this.http.get<GetTasksResponse>(`${this.url}/${todolistId}/tasks`, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.message)
        return EMPTY
      })
    ).subscribe(tasks => {
      this.tasks$.next(tasks.items)
    })
  }
}
