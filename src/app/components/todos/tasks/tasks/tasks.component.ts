import {Component, Input, OnInit} from '@angular/core';
import {CheckboxComponent} from "../../../checkbox/checkbox.component";
import {ButtonComponent} from "../../../button/button.component";
import {TasksService, Task} from "./tasks.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CheckboxComponent,
    ButtonComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TasksService) {
  }
  tasks!: Observable<Task[]>


  @Input() todoId: string = ''


  ngOnInit(): void {
    this.getTask()
    this.tasks = this.taskService.tasks$
  }

  getTask() {
    this.taskService.getTask(this.todoId)
  }
}
