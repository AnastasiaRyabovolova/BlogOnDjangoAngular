import { Input, Component } from "@angular/core"
import { Directive, ElementRef, Renderer2 } from "@angular/core"
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Board, Subject } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { BoardsComponent } from "../../index"

@Component({
  selector: "ngbd-modal-basic",
  templateUrl: "./modal-basic.html",
})
export class NgbdModalBasic {
  @Input() modal_type: Board
  content: Object
  closeResult: string
  board: Board
  init_board: Board
  btn_text: string
  subject_id: number
  subjects: Subject[]
  submitted = false
  title: string

  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    private bc: BoardsComponent,
    private elRef: ElementRef,
  ) {}

  setContext(content) {
    this.init_board = content._parentView.context.modal_type
    this.board = Object.assign({}, content._parentView.context.modal_type)
    this.title = "Edit board"
    this.btn_text = "Edit"
    this.subject_id = this.board.subject.id
  }

  open(content) {
    this.content = content
    this.getSubjects()
    this.board = new Board()
    this.title = "Create new board"
    this.btn_text = "Create"
    console.log(content)
    if (content._parentView.context.modal_type) {
      this.setContext(content)
    }
    this.modalService.open(content)
  }

  isCreateModal(): boolean {
    if (this.modal_type == undefined) {
      return true
    } else {
      return false
    }
  }

  isEditModal(): boolean {
    if (this.modal_type != undefined) {
      return true
    } else {
      return false
    }
  }

  createBoard() {
    this.postBoard(this.board)
    this.board.posts_count = 0
    this.board.topics_count = 0
    this.bc.boards.push(this.board)
  }

  onSubmit() {
    this.submitted = true
    this.board.subject = this.subjects.find(x => x.id == this.subject_id)
    if (this.btn_text == "Create") {
      this.createBoard()
    } else {
      this.patchBoard(this.board)
      let curr_elem = this.bc.boards.filter(x => x.id == this.init_board.id)[0]
      let index = this.bc.boards.indexOf(curr_elem)
      this.bc.boards[index] = this.board
    }
  }

  setInit() {
    // this.bc.boards.getBoards();
    // console.log(this.board);
  }

  getSubjects() {
    this.appService
      .getObject("subjects/", "subjects")
      .subscribe(subjects => (this.subjects = subjects))
  }

  postBoard(board) {
    this.appService
      .postObject("boards/", this.board, "boards")
      .subscribe(result => (this.closeResult = result))
  }

  patchBoard(board) {
    this.appService
      .patchObject("boards/" + this.board.id + "/", this.board, "boards")
      .subscribe(result => (this.closeResult = result))
  }

  updateBoards() {
    this.appService
      .getObject("boards/", "boards")
      .subscribe(boards => (this.bc.boards = boards))
  }
}
