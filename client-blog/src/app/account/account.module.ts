import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { AccountRoutingModule } from "./account-routing.module"
import { SignupComponent } from "./components/signup/signup.component"
import { TypePageComponent } from "./components/type-page/type-page.component"
import { LoginComponent } from "./components/login/login.component"
import { BaseComponent } from "./components/base/base.component"

@NgModule({
  imports: [CommonModule, AccountRoutingModule, FormsModule],
  declarations: [
    SignupComponent,
    TypePageComponent,
    LoginComponent,
    BaseComponent,
  ],
})
export class AccountModule {}
