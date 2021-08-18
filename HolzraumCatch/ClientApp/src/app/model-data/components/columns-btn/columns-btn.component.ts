import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BsDropdownConfig } from "ngx-bootstrap";
import { ModelDataProperty } from "src/app/core/models/model-data-property";

@Component({
  selector: "app-columns-btn",
  templateUrl: "./columns-btn.component.html",
  styleUrls: ["./columns-btn.component.css"],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }],
})
export class ColumnsBtnComponent implements OnInit {
  @Input() columns: ModelDataProperty[] = [];
  @Output() columnsChange = new EventEmitter<ModelDataProperty[]>();

  isOpen = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  toggle(column: ModelDataProperty) {
    column.visible = !column.visible;
    this.columnsChange.emit(this.columns);
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
