import { Component, OnInit } from "@angular/core"
import { User } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submited: boolean
  username: string
  password: string
  user: User
  token: any
  error: string
  errorResp: any
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.user = new User()
    this.username = ""
    this.password = ""
    this.error = ""
  }

  onSubmit() {
    this.user.password = this.password
    this.user.username = this.username
    this.login()
  }

  login() {
    this.appService.setToken("api-token-auth/", this.user).subscribe(
      token => {
        this.token = token
        this.appService
          .setUser(token, this.user)
          .subscribe(() => this.router.navigate(["/"]))
      },
      error => {
        this.error = error
      },
    )
  }
}
