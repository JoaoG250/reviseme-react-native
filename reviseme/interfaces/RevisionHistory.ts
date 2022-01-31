import { Subject } from "./Subject";
import { User } from "./User";

export interface RevisionHistory {
  id: number;
  user?: User;
  date: string;
  subject: Subject;
}
