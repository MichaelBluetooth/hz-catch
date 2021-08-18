import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GridStateService {
  constructor() {}

  saveColumnState(importId: number, columnState: any) {
    localStorage.setItem(
      this.getColumnsKey(importId),
      JSON.stringify(columnState)
    );
  }

  getColumnState(importId) {
    const stateStr = localStorage.getItem(this.getColumnsKey(importId));
    return stateStr ? JSON.parse(stateStr) : null;
  }

  getColumnsKey(importId: number) {
    return `import_${importId}_columns`;
  }
}
