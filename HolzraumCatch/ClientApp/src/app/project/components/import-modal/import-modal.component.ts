import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ImportService } from "../../services/import/import.service";

@Component({
  selector: "app-import-modal",
  templateUrl: "./import-modal.component.html",
  styleUrls: ["./import-modal.component.css"],
})
export class ImportModalComponent implements OnInit {
  @Input() projectId: number;
  @Output() modalClosed = new EventEmitter<boolean>();

  importForm = new FormGroup({
    phase: new FormControl("Feasability Study", Validators.required),
    file: new FormControl(null, Validators.required),
  });
  file: File = null;

  constructor(private importService: ImportService) {}

  ngOnInit(): void {}

  submit() {
    if (this.importForm.valid) {
      this.importService
        .newImport(this.projectId, this.importForm.value.phase, this.file)
        .subscribe(() => {
          this.modalClosed.emit(true);
        });
    }
  }

  updateFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
}
