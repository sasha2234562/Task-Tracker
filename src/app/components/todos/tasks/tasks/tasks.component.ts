import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckboxComponent} from "../../../checkbox/checkbox.component";
import {ButtonComponent} from "../../../button/button.component";
import {TasksService, Task} from "./tasks.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {InputComponent} from "../../../input/input.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CheckboxComponent,
    ButtonComponent,
    NgForOf,
    AsyncPipe,
    InputComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TasksService) {
  }

  tasks!: Observable<Task[]>
  titleTask = ''

  @Input() todoId: string = ''
  @Output() createTask = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.getTask()
    // this.tasks = this.taskService.tasks$
  }

  getTask() {
   this.tasks =  this.taskService.getTask(this.todoId)
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask({todolistId: this.todoId, taskId})
  }

  changeTitle(event: string) {
    this.titleTask = event
  }

  addTask() {
    this.taskService.addTask({todolistId: this.todoId, title: this.titleTask})
  }
}
