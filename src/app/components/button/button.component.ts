import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() titleProps: string = '';
  @Output() onClick = new EventEmitter<void>();

  onClickHandler() {
    this.onClick.emit();

  }
}
