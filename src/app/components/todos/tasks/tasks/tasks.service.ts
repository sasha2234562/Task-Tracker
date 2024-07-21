import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

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

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])

  httpOptions = {
    headers: {
      'api-key': '50659ead-1a5f-4716-a050-11b2b876ac95',
      'Authorization': '3d31f7f8-0cd0-43b5-b75e-cd36b5579564'
    },
    withCredentials: true
  }

  getTask(todolistId: string) {
    return this.http.get<GetTasksResponse>(`${this.url}/${todolistId}/tasks`, this.httpOptions).pipe(
      map(t => t.items)
    )
  }

  addTask({todolistId, title}: { todolistId: string, title: string }) {
    this.http.post<GetTasksResponse>(`${this.url}/${todolistId}/tasks`, {title}, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.message)
        return EMPTY
      })
    ).subscribe(tasks => {
      this.tasks$.next(tasks.items)
    })
  }

  deleteTask({todolistId, taskId}: { todolistId: string, taskId: string }) {
    this.http.delete<GetTasksResponse>(`${this.url}/${todolistId}/tasks/${taskId}`, this.httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.message)
        return EMPTY
      })
    ).subscribe(tasks => {
      this.tasks$.next(tasks.items)
    })
  }
}
