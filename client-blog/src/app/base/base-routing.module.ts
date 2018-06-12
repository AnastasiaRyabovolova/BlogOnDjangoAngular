import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import {
  BoardsComponent,
  TopicsComponent,
  NewTopicComponent,
  PostsComponent,
  EditPostComponent,
  HomeComponent,
} from "./components/index"

const base_routes: Routes = [
  {
    path: "",
    component: BoardsComponent,
  },
  {
    path: "boards/:board_id/topics",
    component: TopicsComponent,
  },
  {
    path: "boards/:board_id/topics/new",
    component: NewTopicComponent,
  },
  {
    path: "boards/:board_id/topics/:topic_id/:page/posts",
    component: PostsComponent,
  },
  {
    path: "boards/:board_id/topics/:topic_id/posts/:post_id",
    component: EditPostComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(base_routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
