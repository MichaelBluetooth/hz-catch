import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/core/models/project';
import { ProjectViewStateService } from '../../services/project-view-state/project-view-state.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  // project = {
  //   projectName: 'Test Project 1',
  //   projectCode: 'TP1-4871254',
  //   created: new Date(11, 20, 2020),
  //   lastUpdated: new Date(8, 10, 2021),
  //   description: 'This is a description of the project. Extra details can go here.',
  //   address: '57 Murfield Drive, Ithaca NY, 14850',
  //   scopes: [
  //     {label: 'New Energy Scope', count: 27},
  //     {label: 'Stolze Scope', count: 54}
  //   ],
  //   users: [
  //     {username: 'Michael.Bluetooth', added: new Date(2022, 11, 20), role: "Owner", userId: 124908},
  //     {username: 'Joseph.Greymane', added: new Date(2022, 11, 22), role: "Owner", userId: 4389},
  //     {username: 'Billy.Joe', added: new Date(2022, 11, 22), role: "Contributor", userId: 34832}
  //   ]
  // }
  project$: Observable<Project> = this.state.project$;

  constructor(private state: ProjectViewStateService) { }

  ngOnInit(): void {  
  }
}
