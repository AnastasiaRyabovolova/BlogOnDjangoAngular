import { Component, OnInit } from "@angular/core"

import { Board, User } from "@app/moduls/index"
import { AppService } from "@app/services/index"

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"],
})
export class BoardsComponent implements OnInit {
  selectedBoard: Board
  modal_type: Board
  context: string
  boards: Board[]
  board: Board
  user: User

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getBoards()
    this.getCurrentUser()
  }

  getBoards(): void {
    this.appService
      .getObject("boards/", "boards")
      .subscribe(boards => (this.boards = boards))
  }

  getCurrentUser() {
    this.appService.getUser().subscribe(user => {
      this.user = user
    })
  }

  getIsLogoutFromChild(value) {
    if (value) {
      this.user = null
    }
  }
}
