import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Post, User, Topic } from "@app/moduls/index"
import { AppService } from "@app/services/index"
import { PostFilterPipe } from "@base/pipes/index"
// import { InfiniteScroll } from "ngx-infinite-scroll"
import { filter } from "rxjs/operators"
import * as Quill from "quill"

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  // directives: [InfiniteScroll],
  styleUrls: ["./posts.component.css"],
  providers: [PostFilterPipe],
})
export class PostsComponent implements OnInit {
  submitted: boolean
  board_id: string
  topic_id: string
  posts: Post[]
  curr_posts: Post[]
  private currentTime: Date
  user: User
  post: Post
  editor: Quill
  error: string
  topic: Topic
  topic_page: number
  page: number
  pages_count: number
  items_count = 10

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private postFilter: PostFilterPipe,
  ) {}

  getParams() {
    this.route.params.subscribe(params => {
      if (params["board_id"]) {
        this.board_id = params["board_id"]
      }
      if (params["topic_id"]) {
        this.topic_id = params["topic_id"]
      }
      if (params["page"]) {
        this.topic_page = params["page"]
      }
    })
  }

  ngOnInit() {
    let options = {
      placeholder: "Add your message...",
      theme: "snow",
    }
    this.getParams()
    this.page = 1
    this.getPosts()
    this.getTopics()
    this.post = new Post()
    this.currentTime = new Date()
    this.getCurrentUser()
    this.editor = new Quill("#editor-container", options)
  }

  addPost() {
    this.postPost()
  }

  onSubmit() {
    this.submitted = true
    this.post.message = this.editor.getText()
    this.post.topic_id = this.topic.id
    this.addPost()
  }

  postPost() {
    this.appService
      .postObject(
        "topics/" + this.topic_id + "/posts/",
        this.post,
        "posts_" + this.topic_id,
      )
      .subscribe(result => this.getPosts(), error => (this.error = error))
  }

  getPosts(): void {
    this.appService
      .getPaginationObject(
        "topics/" + this.topic_id + "/posts/",
        this.page,
        "posts_" + this.topic_id,
      )
      .subscribe(posts => {
        if (this.posts == undefined) {
          this.posts = posts["results"]
          console.log(posts)
          this.pages_count = Math.ceil(posts["count"] / 10)
        } else {
          console.log(this.posts)
          this.posts = this.posts.concat(posts["results"])
        }
      })
  }

  onScroll() {
    if (this.pages_count > this.page) {
      this.page += 1
      this.getPosts()
    }
  }

  getTopics(): void {
    this.appService
      .getPaginationObject(
        "boards/" + this.board_id + "/topics/",
        this.topic_page,
        "topics_" + this.board_id,
      )
      .subscribe(topics => {
        this.topic = topics["results"].filter(
          topic => topic.id == this.topic_id,
        )[0]
      })
  }

  getCurrentUser() {
    this.appService.getUser().subscribe(user => {
      this.user = user
    })
  }
}
