import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {CheckboxComponent} from "../../checkbox/checkbox.component";
import {Res, TodoService} from "./todo.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {InputComponent} from "../../input/input.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    NgForOf,
    AsyncPipe,
    InputComponent,
    NgOptimizedImage
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  constructor(private todoServise: TodoService) {
  }

  // svgUrl = '../../../assets/svg/remove.svg';
  todos!: Observable<Res[]>
  titleNewTodo = ''

  changeTitle(event: string) {
    this.titleNewTodo = event
  }

  ngOnInit() {
    this.todos = this.todoServise.todos$
    this.todoServise.getTodo()
  }

  // @Input()isChecked : boolean = false
  @Output() check = new EventEmitter<boolean>();

  onCheck($event: boolean) {
    console.log('Check $event', $event)
  }

  onAddTodo() {
    console.log(this.titleNewTodo)
    this.todoServise.addTodo(this.titleNewTodo)
  }

  onClickButton() {
    console.log('Click')
  }
}
