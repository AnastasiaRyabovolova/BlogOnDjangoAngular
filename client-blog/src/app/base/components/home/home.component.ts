import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { AppService } from "@app/services/index"
import { User } from "@app/moduls/index"
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap"
import { Router } from "@angular/router"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: any
  @Output() isLogoutToParent = new EventEmitter<boolean>()

  constructor(
    private appService: AppService,
    config: NgbDropdownConfig,
    private router: Router,
  ) {
    config.autoClose = true
    config.placement = "bottom-right"
  }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.appService.getUser().subscribe(user => {
      this.user = user
    })
  }
  logout() {
    this.appService.logout()
    this.isLogoutToParent.emit(true)
    this.user = null
    this.router.navigate(["/"])
  }
  onLog() {}
}
