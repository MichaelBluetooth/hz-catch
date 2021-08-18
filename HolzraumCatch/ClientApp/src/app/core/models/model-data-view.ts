import { ModelDataDefinition } from "./model-data-definition";

export interface ModelDataView {
    definition: ModelDataDefinition;
    data: any[];
    projectId: number;
    importId: number;
    projectName: string;
    importFileName: string;
    importRunDate: Date;
    importPhase: string;
}