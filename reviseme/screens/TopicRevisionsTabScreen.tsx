import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, ProgressBar } from "react-native-paper";
import { TopicRevision } from "../interfaces/TopicRevision";

export default function TopicRevisionsTabScreen() {
  const [topicRevisions, setTopicRevisions] = useState<TopicRevision[]>([]);
  const [revisionProgress, setRevisionProgress] = useState<number>(0);

  // Create test data for topic revisions on component mount
  useEffect(() => {
    setTopicRevisions([
      {
        id: 1,
        topic: {
          id: 1,
          subject: {
            id: 1,
            name: "Mathematics",
            description: "Mathematics subject",
          },
          name: "Addition",
          description: "Addition topic",
          active: true,
        },
        dateRevision1d: "2020-01-01",
        dateRevision7d: "2020-01-02",
        dateRevision30d: "2020-01-03",
        dateRevision90d: "2020-01-04",
        statusRevision1d: "PENDING",
        statusRevision7d: "PENDING",
        statusRevision30d: "PENDING",
        statusRevision90d: "PENDING",
      },
      {
        id: 2,
        topic: {
          id: 2,
          subject: {
            id: 1,
            name: "Mathematics",
            description: "Mathematics subject",
          },
          name: "Subtraction",
          description: "Subtraction topic",
          active: true,
        },
        dateRevision1d: "2020-01-01",
        dateRevision7d: "2020-01-02",
        dateRevision30d: "2020-01-03",
        dateRevision90d: "2020-01-04",
        statusRevision1d: "PENDING",
        statusRevision7d: "PENDING",
        statusRevision30d: "PENDING",
        statusRevision90d: "PENDING",
      },
    ]);
    setRevisionProgress(17);
  }, []);

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
          right={(props) => <Checkbox {...props} status="checked" disabled />}
        />
      </Card>
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
});
