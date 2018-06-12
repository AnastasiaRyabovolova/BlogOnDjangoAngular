import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import {
  SignupComponent,
  TypePageComponent,
  LoginComponent,
} from "./components/index"

const account_routes: Routes = [
  {
    path: "type",
    component: TypePageComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup/:type",
    component: SignupComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(account_routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
