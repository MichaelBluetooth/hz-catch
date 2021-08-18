import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.css"],
})
export class ConfirmComponent {
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() title: string;
  @Input() message: string;
}