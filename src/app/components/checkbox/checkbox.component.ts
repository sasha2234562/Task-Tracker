import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  constructor() {
  }

  isChecked = false

  @Output() check = new EventEmitter<boolean>();

  onChange(isChecked: boolean) {
    this.isChecked = isChecked;
    this.check.emit(isChecked);
  }

}
