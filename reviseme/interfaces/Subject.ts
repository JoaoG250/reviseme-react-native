import { User } from "./User";

export interface Subject {
  id: number;
  name: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubjectRevisionHistory {
  id: number;
  user?: User;
  date: string;
  subject: Subject;
}
