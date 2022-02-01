import { Topic } from "./Topic";
import { TopicFileType } from "./TopicFileType";

export interface TopicLink {
    topic: Topic;
    id: number;
    url: string;
    urlType: TopicFileType;
}
