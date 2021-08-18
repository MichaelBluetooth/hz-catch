import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ColumnMovedEvent,
  ColumnResizedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SortChangedEvent,
} from "ag-grid-community";
import { OptionsFactory } from "ag-grid-community/dist/lib/filter/provided/optionsFactory";
import { ModelDataProperty } from "src/app/core/models/model-data-property";
import { ModelDataView } from "src/app/core/models/model-data-view";
import { FilterOption } from "../../models/filter-option";
import { FilterOptionsPipe } from "../../pipes/filter-options.pipe";
import { GridStateService } from "../../services/grid-state.service";

@Component({
  selector: "app-model-data-view",
  templateUrl: "./model-data-view.component.html",
  styleUrls: ["./model-data-view.component.css"],
})
export class ModelDataViewComponent implements OnInit {
  originalRowData = null;
  view: ModelDataView;

  agColumnDefs = null;
  gridOptions: GridOptions = {
    defaultColDef: {
      // filter: true,
      resizable: true,
      sortable: true,
    },
    applyColumnDefOrder: true,
    columnTypes: {
      Number: {
        comparator: function (valueA, valueB) {
          if (valueA == null) return -1;
          if (valueB == null) return 1;
          if (!valueA.substring || !valueB.substring) return valueA - valueB;
          if (valueA.length < 1 || valueB.length < 1) return valueA - valueB;
          if (!isNaN(valueA) && !isNaN(valueB)) {
            return Number(valueA) - Number(valueB);
          }
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        },
      },
    },
    onGridReady: (grid: GridReadyEvent) => {
      const colState = this.gridState.getColumnState(this.view.importId);
      if (colState) {
        grid.columnApi.setColumnState(colState);

        grid.columnApi.getColumnState().forEach((col) => {
          const idx = this.view.definition.properties.findIndex(
            (p) => p.name === col.colId
          );
          if (idx > -1) {
            this.view.definition.properties[idx].visible = !col.hide;
          }
        });

        this.applyOrder();
      }
    },
    onColumnMoved: (grid: ColumnMovedEvent) => {
      const columnState = grid.columnApi.getColumnState();
      this.gridState.saveColumnState(this.view.importId, columnState);
    },
    onColumnResized: (grid: ColumnResizedEvent) => {
      const colState = this.gridState.getColumnState(this.view.importId);
      this.gridState.saveColumnState(this.view.importId, colState);
    },
    onSortChanged: (grid: SortChangedEvent) => {
      const colState = this.gridState.getColumnState(this.view.importId);
      this.gridState.saveColumnState(this.view.importId, colState);
    },
  };

  materialFilters: FilterOption[] = [];
  functionFilters: FilterOption[] = [];
  panelFilters: FilterOption[] = [];
  sliceFilters: FilterOption[] = [];
  scopeFilters: FilterOption[] = [];
  textFilter: string = "";

  constructor(
    private activeRoute: ActivatedRoute,
    private filterPipe: FilterOptionsPipe,
    private gridState: GridStateService
  ) {}

  ngOnInit(): void {
    this.textFilter = "";
    this.activeRoute.data.subscribe((routeData) => {
      this.view = routeData.view;
      this.view.definition.properties.sort((p1, p2) => {
        if (p1.order > p2.order) {
          return 1;
        } else if (p1.order < p2.order) {
          return -1;
        } else {
          return 0;
        }
      });
      this.originalRowData = JSON.parse(JSON.stringify(this.view.data));
      this.buildColumns();
      this.buildFilters();
    });
  }

  updateGrid(updatedProps: ModelDataProperty[]) {
    this.view.definition.properties = updatedProps;
    this.buildColumns();
    const columnState = this.gridOptions.columnApi.getColumnState();
    columnState.forEach((col) => {
      const idx = this.view.definition.properties.findIndex(
        (p) => p.name === col.colId
      );
      if (idx > -1) {
        col.hide = !this.view.definition.properties[idx].visible;
      }
    });
    this.gridState.saveColumnState(this.view.importId, columnState);
  }

  buildFilters() {
    this.materialFilters = this.filterPipe.transform(
      this.view.data,
      "material"
    );
    this.functionFilters = this.filterPipe.transform(
      this.view.data,
      "function_name"
    );
    this.sliceFilters = this.filterPipe.transform(this.view.data, "sub_group");
    this.scopeFilters = this.filterPipe.transform(this.view.data, "comment");
    this.panelFilters = this.filterPipe.transform(this.view.data, "group");
  }

  buildColumns() {
    this.agColumnDefs = this.view.definition.properties.map((prop) => {
      return {
        field: prop.name,
        hide: !prop.visible,
        headerName: prop.label,
        type: prop.type,
      };
    });
  }

  filterData(field: string, options: FilterOption[]) {
    this.view.data = JSON.parse(JSON.stringify(this.originalRowData));

    const values = options
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);
    if (values.length > 0) {
      this.view.data = this.view.data.filter((row) => {
        return values.indexOf(row[field]) > -1;
      });
    }
  }

  applyOrder() {
    const newOrder = [];
    const columnsMap = {};
    this.gridOptions.api.getColumnDefs().forEach((col) => {
      columnsMap[col["colId"]] = col;
    });

    const savedState = this.gridState.getColumnState(this.view.importId);
    savedState.forEach((column) => {
      newOrder.push(columnsMap[column.colId]);
    });

    this.gridOptions.api.setColumnDefs(newOrder);
  }

  freeTextSearch() {
    alert('TODO');
  }
}
