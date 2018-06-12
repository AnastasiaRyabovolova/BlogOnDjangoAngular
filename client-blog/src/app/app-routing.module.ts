import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "account",
    loadChildren: "app/account/account.module#AccountModule",
  },
  {
    path: "",
    loadChildren: "app/base/base.module#BaseModule",
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
