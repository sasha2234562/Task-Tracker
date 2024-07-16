import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonComponent} from "./components/button/button.component";
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import {TodoComponent} from "./components/todos/todo/todo.component";
import {TodoService} from "./components/todos/todo/todo.service";
import {HttpClientModule} from "@angular/common/http";
import {InputComponent} from "./components/input/input.component";
import {AppService} from "./components/app.service";
import {TasksService} from "./components/todos/tasks/tasks/tasks.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CheckboxComponent, HttpClientModule, TodoComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TodoService, AppService, TasksService]
})
export class AppComponent {
  constructor(private appService: AppService) {
  }

  titleNewTodo = ''

  changeNewTitleTodo(event: string) {
    this.titleNewTodo = event
  }

  addTodo() {
    this.appService.addTodo(this.titleNewTodo)
  }
}
