import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ImportJob } from "src/app/core/models/import-job";
import { Project } from "src/app/core/models/project";
import { ProjectViewStateService } from "../project-view-state/project-view-state.service";

@Injectable({
  providedIn: "root",
})
export class ImportService {
  constructor(
    private http: HttpClient,
    private state: ProjectViewStateService
  ) {}

  newImport(projectId: number, projectPhase: string, file: File) {
    const formData: any = new FormData();
    formData.append("json", JSON.stringify({ projectPhase }));
    formData.append("file", file);

    return this.http.post(`/api/projects/${projectId}/import`, formData).pipe(
      tap((resp: ImportJob) => {
        this.state.addImport(resp);
      })
    );
  }

  activate(projectId: number, importId: number) {
    return this.http
      .post(`/api/projects/${projectId}/activate`, { importId })
      .pipe(
        tap((resp: Project) => {
          this.state.setProject(resp);
        })
      );
  }

  download(importId: number, filename: string) {
    this.http
      .get(`/api/importjobs/${importId}/download`, { responseType: "blob" })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();

      });
  }
}
