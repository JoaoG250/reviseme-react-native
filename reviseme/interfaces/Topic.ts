import { Subject } from "./Subject";

export interface Topic {
  subject: Subject;
  id: number;
  name: string;
  description: string;
  image?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}
