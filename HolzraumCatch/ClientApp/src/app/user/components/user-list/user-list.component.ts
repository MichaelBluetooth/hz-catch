import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users$ = this.activeRoute.data.pipe(map((d) => d.users));

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
