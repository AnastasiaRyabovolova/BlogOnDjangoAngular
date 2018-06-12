import { NgModule } from "@angular/core"
import { DatePipe } from "@angular/common"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http"

import { FormsModule } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"

import { AppRoutingModule } from "./app-routing.module"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
