import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BsDropdownConfig } from "ngx-bootstrap";
import { FilterOption } from "../../models/filter-option";

@Component({
  selector: "app-list-filter-btn",
  templateUrl: "./list-filter-btn.component.html",
  styleUrls: ["./list-filter-btn.component.css"],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }],
})
export class ListFilterBtnComponent implements OnInit {
  @Input() label: string;
  @Input() selections: FilterOption[] = [];
  @Output() selectionsChange = new EventEmitter<FilterOption[]>();

  materialFilters: FilterOption[] = [];

  isOpen = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  toggle(option: FilterOption) {
    option.selected = !option.selected;
    this.selectionsChange.emit(this.selections);
  }

  clear(){
    this.selections.forEach(opt => {
      opt.selected = false;
    });
    this.selectionsChange.emit(this.selections);
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
