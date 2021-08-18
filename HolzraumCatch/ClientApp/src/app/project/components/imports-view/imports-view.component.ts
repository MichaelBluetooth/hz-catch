import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ImportService } from '../../services/import/import.service';

@Component({
  selector: 'app-imports-view',
  templateUrl: './imports-view.component.html',
  styleUrls: ['./imports-view.component.css']
})
export class ImportsViewComponent implements OnInit {

  @Input() project: Project;

  showImport = false;

  constructor(private imports: ImportService) { }

  ngOnInit(): void {
  }

  activate(importId: number){
    this.imports.activate(this.project.id, importId).subscribe();
  }

  download(importId: number, filename: string){
    this.imports.download(importId, filename);
  }

}
