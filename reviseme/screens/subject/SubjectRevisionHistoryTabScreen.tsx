import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, Colors, ProgressBar } from "react-native-paper";
import { Subject } from "../../interfaces/Subject";
import { TopicRevision } from "../../interfaces/Topic";
import { getSubject, getSubjectRevisionProgress } from "../../services/subject";
import { getTopicRevisions } from "../../services/topic";
import { SubjectTabScreenProps } from "../../types";
import { formatDate } from "../../utils/formatters";

export default function SubjectRevisionHistoryTabScreen({
  route,
}: SubjectTabScreenProps<"SubjectRevisionHistoryTab">) {
  const [subject, setSubject] = useState<Subject>();
  const [revisions, setRevisions] = useState<TopicRevision[]>([]);
  const [revisionProgress, setRevisionProgress] = useState<number>(0);

  // Get subject on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchSubject() {
        const subjectResponse = await getSubject(route.params.subjectId);
        setSubject(subjectResponse.data);

        // Get subject topics
        const revisionsResponse = await getTopicRevisions({
          subject: subjectResponse.data.id,
        });
        setRevisions(revisionsResponse.data);

        // Get revision progress
        const revisionProgressResponse = await getSubjectRevisionProgress(
          route.params.subjectId
        );

        // Round to two decimal places
        const progress = Number(
          revisionProgressResponse.data.progress.toFixed(2)
        );

        setRevisionProgress(progress);
      }
      fetchSubject();
    }, [])
  );

  function renderTopicRevision({ item }: { item: TopicRevision }) {
    return (
      <Card
        style={{
          marginBottom: 10,
        }}
      >
        <Card.Title
          title={item.topic.name}
          subtitle={formatDate(item.updatedAt)}
          right={(props) => (
            <Checkbox
              {...props}
              status={item.complete ? "checked" : "unchecked"}
              disabled
            />
          )}
        />
      </Card>
    );
  }

  if (revisions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemsAlert}>No revision history</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisions</Text>
      <View style={styles.historyContainer}>
        <FlatList
          data={revisions}
          renderItem={renderTopicRevision}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.separator} />
      <Text style={styles.revisionProgressPercentage}>{revisionProgress}%</Text>
      <View style={styles.progressContainer}>
        <ProgressBar progress={revisionProgress / 100} />
      </View>
      <Text>{revisionProgress}% of revisions completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 20,
  },
  historyContainer: {
    width: "100%",
    maxHeight: "50%",
    padding: 16,
  },
  noItemsAlert: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.orangeA100,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  progressContainer: {
    width: "100%",
    padding: 16,
  },
  revisionProgressPercentage: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
