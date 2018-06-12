import { Input, Component, ViewEncapsulation } from "@angular/core"
import { Directive, ElementRef, Renderer2 } from "@angular/core"
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Board, Subject } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { BoardsComponent } from "../../index"

@Component({
  selector: "ngbd-modal-delete",
  templateUrl: "./modal-delete.html",
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalDelete {
  closeResult: string
  @Input() board_id: number

  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    private bc: BoardsComponent,
    private elRef: ElementRef,
  ) {}

  openSm(content) {
    console.log(content)
    this.modalService.open(content, { size: "sm" })
  }

  onSubmit() {
    this.deleteBoard()
    let boards = this.bc.boards.filter(x => x.id !== this.board_id)
    this.bc.boards = boards
  }
  deleteBoard() {
    this.appService
      .deleteObject("boards/" + this.board_id + "/", "boards")
      .subscribe(result => (this.closeResult = result))
  }
}
