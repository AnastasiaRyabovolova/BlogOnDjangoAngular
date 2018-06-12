import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"

import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { NgbModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap"
import { NgbdModalBasic } from "./components/boards/modal/modal"
import { NgbdModalDelete } from "./components/boards/modal-delete/modal-delete"

import {
  BoardsComponent,
  TopicsComponent,
  NewTopicComponent,
  PostsComponent,
  EditPostComponent,
} from "./components/index"

import { BaseRoutingModule } from "./base-routing.module"

import { PostFilterPipe, TopicFilterPipe } from "./pipes/index"
import { HomeComponent } from "./components/home/home.component"

@NgModule({
  declarations: [
    BoardsComponent,
    TopicsComponent,
    NgbdModalBasic,
    NgbdModalDelete,
    NewTopicComponent,
    PostsComponent,
    PostFilterPipe,
    TopicFilterPipe,
    EditPostComponent,
    HomeComponent,
  ],
  imports: [
    NgbDropdownModule.forRoot(),
    FormsModule,
    BaseRoutingModule,
    CommonModule,
    NgbModule.forRoot(),
    InfiniteScrollModule,
  ],
  exports: [],
})
export class BaseModule {}
