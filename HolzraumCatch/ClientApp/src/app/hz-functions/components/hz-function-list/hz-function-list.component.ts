import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HzFunction } from "src/app/core/models/hz-function";

@Component({
  selector: "app-hz-function-list",
  templateUrl: "./hz-function-list.component.html",
  styleUrls: ["./hz-function-list.component.css"],
})
export class HzFunctionListComponent implements OnInit {
  functions$: Observable<HzFunction[]> = this.activatedRoute.data.pipe(
    map((resp) => resp.functions)
  );

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
