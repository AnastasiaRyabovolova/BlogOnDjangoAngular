import { Input, Component, OnInit, ViewEncapsulation } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Directive, ElementRef, Renderer2 } from "@angular/core"
import { Subscription } from "rxjs"
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Topic, Post } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { Router } from "@angular/router"
import { PostsComponent } from "@base/components/posts/posts.component"

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnInit {
  closeResult: string
  post_id: string
  submitted = false
  topic: Topic
  post: Post
  posts: Post[]
  message: string
  subject: string
  sub: Subscription

  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["post_id"]) {
        this.post_id = params["post_id"]
      }
    })
    this.getPosts()
    this.post = this.posts.filter(post => +this.post_id == post.id)[0]
    console.log(this.post)
  }

  updatePost() {
    this.patchPost()
    this.onCancel()
  }

  onCancel() {
    let path = this.router.url.split("/")
    path.pop()
    let curr_path = path.join("/")
    this.router.navigate([curr_path])
  }

  onSubmit() {
    this.submitted = true
    this.updatePost()
  }

  patchPost() {
    this.appService
      .patchObject("posts/" + this.post_id, this.post, "posts/")
      .subscribe(result => (this.closeResult = result))
  }

  getPosts(): void {
    this.appService
      .getObject("posts/", "posts")
      .subscribe(posts => (this.posts = posts))
  }
}
