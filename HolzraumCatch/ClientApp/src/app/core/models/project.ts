import { ImportJob } from "./import-job";
import { ProjectUser } from "./project-user";
import { SummaryData } from "./summary-data";

export interface Project {
    id: number;
    projectName: string;
    projectCode: string;
    address: string;
    description: string;
    lastUpdated: Date;
    created: Date;

    scopes: SummaryData[];
    functions: SummaryData[];
    slices: SummaryData[];    
    panels: SummaryData[];
    materials: SummaryData[];

    projectUsers: ProjectUser[];

    imports: ImportJob[];
}