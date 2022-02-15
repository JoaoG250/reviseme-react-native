import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, ProgressBar } from "react-native-paper";
import { TopicRevision } from "../../interfaces/Topic";
import {
  getDailyTopicRevisions,
  getTopicRevisionsProgress,
} from "../../services/topic";
import baseStyle from "../../styles/base";
import listStyle from "../../styles/list";
import progressStyle from "../../styles/progress";
import { RootTabScreenProps } from "../../types";

export default function TopicRevisionsTabScreen({
  navigation,
}: RootTabScreenProps<"TopicRevisionsTab">) {
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
      <Pressable
        onPress={() => {
          navigation.navigate("Topic", { topicId: item.topic.id });
        }}
      >
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Title
            title={item.topic.name}
            subtitle={item.topic.subject.name}
            right={(props) => (
              <Checkbox {...props} status="unchecked" disabled />
            )}
          />
        </Card>
      </Pressable>
    );
  }

  if (topicRevisions.length === 0) {
    return (
      <View style={baseStyle.container}>
        <Text style={listStyle.noItemsAlert}>No daily revisions</Text>
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
      <Text style={baseStyle.title}>Daily Revisions</Text>
      <View style={styles.revisionsContainer}>
        <FlatList
          data={topicRevisions}
          renderItem={renderTopicRevision}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={baseStyle.separator} />
      <Text style={progressStyle.revisionProgressPercentage}>
        {revisionProgress}%
      </Text>
      <View style={progressStyle.progressContainer}>
        <ProgressBar progress={revisionProgress / 100} />
      </View>
      <Text>{revisionProgress}% of revisions completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  revisionsContainer: {
    width: "100%",
    maxHeight: "50%",
    padding: 16,
  },
});
