import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent {
  @Input() visible: boolean = false;
  @Input() errorList: string[] = [];
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
