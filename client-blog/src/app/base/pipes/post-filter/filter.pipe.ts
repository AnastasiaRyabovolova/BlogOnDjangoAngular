import { Pipe, PipeTransform } from "@angular/core"
import { Post } from "@app/moduls/index"

@Pipe({
  name: "postFilter",
})
export class PostFilterPipe implements PipeTransform {
  transform(value: Post[], id: number): any {
    console.log(value, id)
    if (value == undefined) return []
    console.log(value, id)
    return value.filter(post => post.topic_id == id)
  }
}
