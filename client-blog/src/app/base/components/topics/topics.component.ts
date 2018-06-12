import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Observable, of } from "rxjs"
import { catchError, map, tap, find } from "rxjs/operators"
import { TopicFilterPipe } from "@base/pipes/index"

import { Topic, User, Board } from "@app/moduls/index"
import { AppService } from "@app/services/index"

@Component({
  selector: "app-topics",
  templateUrl: "./topics.component.html",
  styleUrls: ["./topics.component.css"],
})
export class TopicsComponent implements OnInit {
  board_id: string
  board: Board
  topics: any
  private currentTime: Date
  user: User
  values: any
  pages: Array<number>
  page: number

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["board_id"]) {
        this.board_id = params["board_id"]
      }
    })
    this.page = 1

    this.getTopics()
    this.getBoard()
    this.getCurrentUser()
    this.currentTime = new Date()
  }

  getTopics(): void {
    this.appService
      .getPaginationObject(
        "boards/" + this.board_id + "/topics/",
        this.page,
        "topics_" + this.board_id,
      )
      .subscribe(values => {
        console.log(values)

        this.topics = values["results"]
        this.pages = Array(Math.ceil(values["count"] / 10))
          .fill(0)
          .map((x, i) => i + 1)
      })
  }
  update(value): void {
    this.page = value
    this.pages = null
    this.getTopics()
  }

  setPage(value): void {
    this.update(value)
  }

  next(value): void {
    if (value < this.pages.length) {
      this.update(value + 1)
    }
  }

  previous(value): void {
    if (value > 1) {
      this.update(value - 1)
    }
  }

  getBoard(): void {
    this.appService
      .getObject("boards/", "boards")
      .pipe(find(board => board.id == this.board_id))
      .subscribe(board => (this.board = board))
  }

  getCurrentUser() {
    this.appService.getUser().subscribe(user => {
      this.user = user
    })
  }
}
