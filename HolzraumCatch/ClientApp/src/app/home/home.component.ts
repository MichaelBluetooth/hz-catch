import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  project = {
    projectName: 'Test Project 1',
    projectCode: 'TP1-4871254',
    created: new Date(11, 20, 2020),
    lastUpdated: new Date(8, 10, 2021),
    description: 'This is a description of the project. Extra details can go here.',
    address: '57 Murfield Drive, Ithaca NY, 14850',
    scopes: [
      {name: 'New Energy Scope', count: 27},
      {name: 'Stolze Scope', count: 54}
    ]
  }
}
