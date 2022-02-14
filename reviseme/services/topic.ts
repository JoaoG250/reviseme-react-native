import api from "../api";
import { Topic, TopicRevision } from "../interfaces/Topic";

type topicRevisionPhase = "1D" | "7D" | "30D" | "90D";

interface TopicsQueryParams {
  subject?: number;
  active?: boolean;
}
interface TopicRevisionsQueryParams {
  subject?: number;
  topic?: number;
  phase?: topicRevisionPhase;
  revision_date?: string;
  revision_date__lte?: string;
  completed?: boolean;
}

// Get all topics
export async function getTopics(queryParams: TopicsQueryParams) {
  return api.get<Topic[]>("topics/", {
    params: queryParams,
  });
}

// Get all topic revisions
export async function getTopicRevisions(
  queryParams: TopicRevisionsQueryParams
) {
  return api.get<TopicRevision[]>("topic-revisions/", {
    params: queryParams,
  });
}

// Get topic revisions history
export async function getTopicRevisionsHistory() {
  return api.get<TopicRevision[]>("topic-revisions/", {
    params: {
      complete: true,
    },
  });
}

// Get daily topic revisions
export async function getDailyTopicRevisions() {
  return api.get<TopicRevision[]>("topic-revisions/", {
    params: {
      revision_date__lte: new Date().toISOString().split("T")[0],
      complete: false,
    },
  });
}

// Get topic revisions progress
export async function getTopicRevisionsProgress() {
  return api.get<{ progress: number }>("topics/revision_progress/");
}
