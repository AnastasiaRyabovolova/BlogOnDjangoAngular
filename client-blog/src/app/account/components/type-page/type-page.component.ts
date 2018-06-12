import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-type-page",
  templateUrl: "./type-page.component.html",
  styleUrls: ["./type-page.component.css"],
})
export class TypePageComponent implements OnInit {
  private type: string

  constructor(private router: Router) {}

  ngOnInit() {
    this.type = "reporter"
  }

  setReaderType() {
    this.type = "reader"
    this.router.navigate(["account/signup", this.type])
  }
}
