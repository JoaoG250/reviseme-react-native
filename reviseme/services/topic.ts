import api from "../api";
import { TopicRevision } from "../interfaces/Topic";

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
