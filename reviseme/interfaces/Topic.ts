import { Subject } from "./Subject";

export interface Topic {
  subject: Subject;
  id: number;
  name: string;
  description: string;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TopicFileType = "PDF" | "IMAGE" | "VIDEO" | "AUDIO";

export interface TopicFile {
  topic: Topic;
  fileType: TopicFileType;
  id: number;
  file: string;
}

export interface TopicLink {
  topic: Topic;
  id: number;
  url: string;
  urlType: TopicFileType;
}

type TopicRevisionPhase = "1D" | "7D" | "30D" | "90D";

export interface TopicRevision {
  id: number;
  topic: Topic;
  phase: TopicRevisionPhase;
  revisionDate: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TopicFile {
  topic: Topic;
  file: string;
  fileType: TopicFileType;
}
