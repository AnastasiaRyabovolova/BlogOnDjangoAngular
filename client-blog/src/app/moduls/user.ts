import { Board, Post, City } from "./index"

export class User {
  id: number
  username: string
  email: string
  password: string
  city: City
  is_reader: boolean
  is_reporter: boolean

  constructor() {
    this.is_reader = false
    this.is_reporter = false
  }
}

export class Reader extends User {
  interests: Array<string>
}
