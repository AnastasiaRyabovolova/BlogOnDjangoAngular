export class Subject {
  id: number;
  name: string;
}

export class Board {
  id: number;
  name: string;
  description: string;
  creater: string;
  subject: Subject;
  is_deleted: boolean;
  posts_count: number;
  topics_count: number;
}
