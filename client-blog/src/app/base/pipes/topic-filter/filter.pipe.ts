import { Pipe, PipeTransform } from "@angular/core"
import { Topic } from "@app/moduls/index"

@Pipe({
  name: "topicFilter",
})
export class TopicFilterPipe implements PipeTransform {
  transform(value: Topic[], id: number): any {
    if (value == undefined) return []
    return value.filter(topic => topic.board_id == id)
  }
}
