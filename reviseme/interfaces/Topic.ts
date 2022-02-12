import { Subject } from "./Subject";

export interface Topic {
  subject: Subject;
  id: number;
  name: string;
  description: string;
  image?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
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

type TopicRevisionStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface TopicRevision {
  id: number;
  topic: Topic;
  dateRevision1d: string;
  dateRevision7d: string;
  dateRevision30d: string;
  dateRevision90d: string;
  statusRevision1d: TopicRevisionStatus;
  statusRevision7d: TopicRevisionStatus;
  statusRevision30d: TopicRevisionStatus;
  statusRevision90d: TopicRevisionStatus;
}
