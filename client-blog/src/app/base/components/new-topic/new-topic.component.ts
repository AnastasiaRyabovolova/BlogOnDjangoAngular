import { Input, Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Directive, ElementRef, Renderer2 } from "@angular/core"
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Topic, Post } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { Router } from "@angular/router"

@Component({
  selector: "app-new-topic",
  templateUrl: "./new-topic.component.html",
  styleUrls: ["./new-topic.component.css"],
})
export class NewTopicComponent implements OnInit {
  closeResult: string
  board_id: string
  submitted = false
  topic: Topic
  post: Post
  message: string
  subject: string

  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["board_id"]) {
        this.board_id = params["board_id"]
      }
    })
    this.topic = new Topic()
    this.post = new Post()
    this.topic.board_id = +this.board_id
  }

  createTopicWithPost() {
    this.topic.subject = this.subject
    this.post.message = this.message
    this.postTopic()
    this.router.navigate(["../"], { relativeTo: this.route })
  }

  onSubmit() {
    this.submitted = true
    this.createTopicWithPost()
  }
  postTopic() {
    console.log(this.post)
    this.appService
      .postObject(
        "boards/" + this.board_id + "/topics/",
        this.topic,
        "topics_" + this.board_id,
      )
      .subscribe(topic => this.postPost(topic.id))
  }
  postPost(topic_id) {
    this.post.topic_id = topic_id
    this.appService
      .postObject("posts/", this.post, "posts")
      .subscribe(post => (this.post = post))
  }
}
