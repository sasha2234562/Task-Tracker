import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  constructor() {
  }

  title = ''
  @Output() changeTitleProps = new EventEmitter<string>()

  changeTitle(event: Event) {
    this.title = (event.currentTarget as HTMLInputElement).value
    this.changeTitleProps.emit(this.title)
  }
}
