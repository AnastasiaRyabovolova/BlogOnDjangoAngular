import { Board, User, Post } from "./index"

export class Topic {
  id: number
  subject: string
  last_updated: Date
  board_id: number
  starter: User
  views: number

  constructor() {
    this.views = 0
  }
}

export class TopicWithPost {
  id: number
  subject: string
  board_id: number
  post: Post
}
