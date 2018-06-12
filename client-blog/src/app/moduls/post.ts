import { Topic, User } from "./index"

export class Post {
  id: number
  message: string
  topic_id: number
  created_at: Date
  updated_at: Date
  created_by: User
  updated_by: User
}
