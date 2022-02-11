import { User } from "./User";

export interface Subject {
  id: number;
  name: string;
  description: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubjectRevisionHistory {
  id: number;
  user?: User;
  date: string;
  subject: Subject;
}
