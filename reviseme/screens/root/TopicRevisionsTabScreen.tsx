import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, Colors, ProgressBar } from "react-native-paper";
import { TopicRevision } from "../../interfaces/Topic";
import {
  getDailyTopicRevisions,
  getTopicRevisionsProgress,
} from "../../services/topic";

export default function TopicRevisionsTabScreen() {
  const [topicRevisions, setTopicRevisions] = useState<TopicRevision[]>([]);
  const [revisionProgress, setRevisionProgress] = useState<number>(0);

  // Fetch the data on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const topicsResponse = await getDailyTopicRevisions();
        setTopicRevisions(topicsResponse.data);
        const progressResponse = await getTopicRevisionsProgress();

        // Round to two decimal places
        const progress = Number(progressResponse.data.progress.toFixed(2));

        setRevisionProgress(progress);
      }

      fetchData();
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
          subtitle={item.topic.subject.name}
          right={(props) => <Checkbox {...props} status="unchecked" disabled />}
        />
      </Card>
    );
  }

  if (topicRevisions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemsAlert}>No daily revisions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Revisions</Text>
      <View style={styles.revisionsContainer}>
        <FlatList
          data={topicRevisions}
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
  revisionsContainer: {
    width: "100%",
    maxHeight: "50%",
    padding: 16,
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
});
