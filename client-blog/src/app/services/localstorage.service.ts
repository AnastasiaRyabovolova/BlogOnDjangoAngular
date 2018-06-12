import { Injectable } from "@angular/core"
import { DatePipe } from "@angular/common"

@Injectable({
  providedIn: "root",
})
export class LocalstorageService {
  constructor(private datePipe: DatePipe) {}

  get(key: string): any {
    let update_time = 60 * 60 * 10
    if (key == "user" || key == "token") {
      update_time = 60 * 60 * 60 * 60 * 24
    }

    let items = JSON.parse(localStorage.getItem(key))
    if (items !== null) {
      let new_date = new Date().getTime()
      if (new_date - items["__date"] < update_time) {
        return items["values"]
      }
    }
    return null
  }

  addItem(key, field, value): void {
    let items = JSON.parse(localStorage.getItem(key))
    if (items !== null) {
      items[name] = value
    }
  }

  set(key: string, obj: any): void {
    let item = { values: obj, __date: new Date().getTime() }
    localStorage.setItem(key, JSON.stringify(item))
  }

  setPages(key: string, obj: any): void {
    let item = { values: obj, __date: new Date().getTime() }
    localStorage.setItem(key, JSON.stringify(item))
  }

  del(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }

  refresh(): void {
    localStorage.refresh()
  }
}
