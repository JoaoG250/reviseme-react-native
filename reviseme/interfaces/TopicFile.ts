import { Topic } from "./Topic";
import { TopicFileType } from "./TopicFileType";

export interface TopicFile {
    topic: Topic;
    fileType: TopicFileType;
    id: number;
    file: string;
}


